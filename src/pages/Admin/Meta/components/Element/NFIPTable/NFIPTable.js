import React, {useEffect, useMemo, useState} from 'react'
import {Input, Select, Table, useFalcor} from '@availabs/avl-components'
import _ from 'lodash'
import get from 'lodash.get'
import divider from "components/UI/divider";
import {colProperties, columnsForMeta, columnsForTable, formatMapping} from "utils/tableColProperties";

const nameMapping = {
    'State': 'counties',
    'County': 'municipalities',
}

function renderMetaOptions(props, state, setState, cache) {
    const columns = columnsForMeta(['Jurisdiction', 'total losses', 'closed losses', 'open losses', 'cwop losses', 'total payments'], state)

    const handleChange = (e) => {
        e = Object.assign({}, e, {cachedData: null})
        setState(e)
        props.onChange(JSON.stringify(e))
    }

    return (
        <div className={'bg-blue-50 shadow sm:rounded-md px-4 py-5 sm:p-6'}>
            <label> Select Geography Level: </label>
            <Select
                key={'geo'}
                domain={['State', 'County']}
                value={state.geo}
                onChange={e => handleChange(Object.assign(state, {geo: e}))}
                multi={false}
            />

            <label> Filter Geography: </label>
            <Select
                domain={get(cache, ['geo', '36', 'counties', 'value'], []).map(d => ({
                    value: d,
                    name: get(cache, ['geo', d, 'name'], 'No Name')
                }))}
                value={state.filterBy}
                listAccessor={d => d.name}
                accessor={d => d.name}
                valueAccessor={d => d.value}
                onChange={e => handleChange(Object.assign(state, {filterBy: e || []}))}
            />
            <label> Select Columns: </label>
            <Select
                key={'cols'}
                domain={_.keys(columns)}
                value={_.uniqBy(['Jurisdiction', ..._.keys(state.cols)])}
                onChange={e => handleChange(Object.assign({}, state, {cols: e.reduce((acc, tmpCol) => Object.assign(acc, {[tmpCol]: columns[tmpCol]}), {})}))}
            />
            {
                !state.cols ? null : colProperties(state, handleChange)
            }
            <label className={'pr-5'}>Page Size</label>
            <Input
                className={'bg-blue-50'}
                key={'pageSize'}
                type={'number'}
                placeholder={'10'}
                value={state.pageSize}
                onChange={e => handleChange(Object.assign(state, {pageSize: parseInt(e)}))}
            />
        </div>
    )
}

function geoReverseLookupTable(cache) {
    let lookupTable = {};
    _.keys(get(cache, ['geo'], {}))
        .forEach(county => {
            get(cache, ['geo', county, 'municipalities', 'value'], [])
                .forEach(municipality => {
                    lookupTable[municipality] = county
                })
        })
    return lookupTable
}

function ProcessData(state, cache) {
    const childGeo = nameMapping[state.geo];
    const geoGraph = get(cache, ['geo', '36', childGeo, 'value'], []);
    let data = [], columns = columnsForTable(state);
    let lookupTable = useMemo(() => geoReverseLookupTable(cache), [cache]);
    if (!geoGraph || !geoGraph.length) return {data, columns};

    geoGraph
        .filter(geoId => childGeo === 'counties' ? geoId.length === 5 : geoId.length > 5)
        .filter(geoId => {
            if (childGeo === 'counties') {
                return !get(state, ['filterBy']).length || get(state, ['filterBy'], get(cache, ['geo', '36', 'counties', 'value'], [])).includes(geoId);
            } else if (childGeo === 'municipalities') {
                let countyGeo = lookupTable[geoId];
                return !state.filterBy.length || (state.filterBy.length && _.intersection(state.filterBy, [countyGeo]).length);
            } else {
                return true;
            }
        })
        .forEach(geoId => {
            let graph = get(cache, ['nfip', 'losses', 'byGeoid', geoId, 'allTime'], {})
            data.push({
                'Jurisdiction': get(cache, ['geo', geoId, 'name']),
                "total losses": graph.total_losses,
                "closed losses": graph.closed_losses,
                "open losses": graph.open_losses,
                "cwop losses": graph.cwop_losses,
                "total payments": graph.total_payments,
                "paid claims": (+graph.total_losses - +graph.cwop_losses),
                'repetitive loss': +graph.repetitive_loss,
                'severe repetitive loss': +graph.severe_repetitive_loss,
                '# of policies': +graph.number_policies,
            })
        })


    return {data, columns}
}

function renderTable(props, state, setState, cache) {
    if (!state.cols || !state.geo) return null;
    let data;
    if (!state.cachedData) {
        data = ProcessData(state, cache);
        setState(Object.assign({}, state, {cachedData: data}));
        if (props.onChange) {
            props.onChange(JSON.stringify(Object.assign({}, state, {cachedData: data, cachedDate: Date.now()})))
        }
    } else {
        ProcessData(state, cache)
        data = state.cachedData;
        data.columns = data.columns.map(c => Object.assign({}, c, {accessor: cc => formatMapping[c.format](cc[c.Header])}))
    }

    return <Table {...data} initialPageSize={Math.min(100, state.pageSize || 10)} striped/>

}

function NFIPTable(props) {
    const {falcor, falcorCache} = useFalcor();
    const values = props.value ? JSON.parse(props.value) : {geo: 'State', cols: {}, pageSize: null, filterBy: []}
    const [state, setState] = useState({
        'geo': values.geo || null,
        'cols': values.cols || {},
        'pageSize': values.pageSize || null,
        'filterBy': values.filterBy || [],
        cachedData: values.cachedData || null
    })
    const childGeo = nameMapping[state.geo];

    useEffect(() => {
        async function fetchData() {
            let response = await falcor.get(["geo", '36', 'counties'], ["geo", '36', 'municipalities'])
            let childGeos = await falcor.get(['geo', get(response, ['json', 'geo', '36', 'counties'], []), 'municipalities'])

            response = [
                ...get(response, `json.geo.36.counties`, []),
                ...get(response, `json.geo.36.municipalities`, []),
                ...get(response, ['json', 'geo', '36', 'counties'], [])
                    .reduce((a, c) =>
                        [...a,
                            ...get(childGeos, `json.geo.${c}.municipalities`, []),
                        ], [])
            ]

            if (response.length) {
                await falcor.get(
                    ['geo', ['36', ...response], ['name']],
                    ['nfip', 'losses', 'byGeoid',
                        response, 'allTime',
                        ['total_losses', 'closed_losses', 'open_losses', 'cwop_losses', 'total_payments',
                            'repetitive_loss', 'severe_repetitive_loss', 'number_policies']]
                )
            }
        }

        return fetchData();
    }, [childGeo, falcor, state]);

    return (
        <div>
            {props.viewOnly ? null : renderMetaOptions(props, state, setState, falcorCache)}
            {props.viewOnly ? null : divider}
            {renderTable(props, state, setState, falcorCache)}
        </div>)
}

export default NFIPTable