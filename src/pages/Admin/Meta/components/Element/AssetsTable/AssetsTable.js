import React, {useEffect, useState} from 'react'
import {Input, Select, Table, useFalcor} from '@availabs/avl-components'
import _ from 'lodash'
import get from 'lodash.get'
import filterByTypes from './meta'
import {colProperties, columnsForMeta, columnsForTable, formatMapping} from "utils/tableColProperties"
import divider from 'components/UI/divider'

const nameMapping = {
    'Jurisdiction': 'jurisdiction',
    'Owner Type': 'ownerType',
    'Land Use Type': 'propType',
    'County': 'counties',
    'Municipality': 'municipalities',
    'Annual 1%': '100 yr',
    'Annual 0.2%': '500 yr',
}

const keyCols = ['Jurisdiction', 'Owner Type', 'Land Use Type'];

function renderMetaOptions(props, state, setState, cache) {
    const columns = columnsForMeta([state.groupBy, 'Number of Assets', 'Value of Assets', '# in 100 yr', '$ in 100 yr', '# in 500 yr', '$ in 500 yr'], state)

    const handleChange = (e) => {
        e = Object.assign({}, e, {cachedData: null})
        setState(e)
        props.onChange(JSON.stringify(e))
    }
    const populateFilterByValues = () => {
        const childGeo = nameMapping[state.geo];

        return state.filterBy === 'Jurisdiction' ?
            get(cache, ['geo', '36', childGeo, 'value'], []).map(d => ({
                value: d,
                name: get(cache, ['geo', d, 'name'], 'No Name')
            })) :
            (
                filterByTypes[state.filterBy] || []
            )
    }

    return (
        <div className={'bg-blue-50 shadow sm:rounded-md px-4 py-5 sm:p-6'}>
            <label> Select Geography Level: </label>
            <Select
                key={'geo'}
                domain={['County', 'Municipality']}
                value={state.geo}
                onChange={e => handleChange(Object.assign({}, state, {geo: e}))}
                multi={false}
            />
            <label> Select Filter By Column: </label>
            <Select
                key={'filterBy'}
                domain={keyCols}
                value={state.filterBy}
                onChange={e => handleChange(Object.assign({}, state, {filterBy: e, filterByValue: []}))}
                multi={false}
            />

            <label> Select Filter By Column Value: </label>
            <Select
                key={'filterByValue'}
                options={populateFilterByValues()}
                value={state.filterByValue}
                listAccessor={d => d.name}
                accessor={d => d.name}
                valueAccessor={d => d.value}
                onChange={e => handleChange(Object.assign({}, state, {filterByValue: e}))}
            />

            <label> Select Group By Column: </label>
            <Select
                key={'groupBy'}
                domain={keyCols}
                value={state.groupBy}
                onChange={e => {

                    handleChange(Object.assign({}, state, {
                        groupBy: e,
                        cols: _.uniqBy([e, ..._.difference(_.keys(state.cols), keyCols)])
                            .reduce((acc, tmpCol) => Object.assign(acc, {[tmpCol]: columns[tmpCol]}), {})
                    }))
                }}
                multi={false}
            />
            <label> Select Columns: </label>
            <Select
                key={'cols'}
                domain={_.keys(columns)}
                value={_.uniqBy([state.groupBy, ..._.keys(state.cols)])}
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
                onChange={e => handleChange(Object.assign({}, state, {pageSize: parseInt(e)}))}
            />
        </div>
    )
}

function processData(state, cache) {
    const childGeo = nameMapping[state.geo];
    const geoGraph = get(cache, ['geo', '36', childGeo, 'value'], []);
    const activeGeo = '36'
    let data = [],
        columns = columnsForTable(state);

    if (!geoGraph || !geoGraph.length) return {data, columns};

    let graph = get(cache, ['building', 'byGeoid', activeGeo, nameMapping[state.groupBy]], {});
    let riskMappings = _.get(cache, ['building', 'byGeoid', 36, nameMapping[state.groupBy]], {})

    data = (state.groupBy === 'Jurisdiction' ? geoGraph : filterByTypes.getValues(filterByTypes[state.groupBy]))
        .filter(gbvKey => state.filterByValue.includes(gbvKey) || !state.filterByValue.length)
        .reduce((a, gbvKey) => {
            gbvKey = parseInt(gbvKey)
            let newKey = state.groupBy === 'Land Use Type' ? gbvKey - (gbvKey % 100) : gbvKey;

            let riskData =
                _.map(_.values(_.get(riskMappings, [gbvKey, 'byRiskScenario'], {})),
                    (d) => _.get(d, ['byRiskZone', 'all', 'value']))
                    .filter(c => c)
                    .reduce((rdA, rdC) => {
                        rdC.forEach(c1 => {
                            rdA[`$ in ${nameMapping[c1.name]}`] = get(rdA, `$ in ${nameMapping[c1.name]}`, 0) + parseInt(c1.sum || '0');
                            rdA[`# in ${nameMapping[c1.name]}`] = get(rdA, `# in ${nameMapping[c1.name]}`, 0) + parseInt(c1.count || '0')
                        })
                        return rdA
                    }, {})

            let tmp = {
                [state.groupBy]:
                    state.groupBy === 'Jurisdiction' ?
                        get(cache, ['geo', newKey, 'name']) :
                        filterByTypes.getName(filterByTypes[state.groupBy], newKey.toString()),
                'Number of Assets': get(a, [newKey, 'Number of Assets'], 0) + parseInt(get(graph, [gbvKey, 'sum', 'count', 'value'], 0)),
                'Value of Assets': get(a, [newKey, 'Value of Assets'], 0) + parseInt(get(graph, [gbvKey, 'sum', 'replacement_value', 'value'], 0)),
                ...Object.keys(riskData).reduce((riskZoneDataA, riskZoneDataKeyC) => {
                    riskZoneDataA[riskZoneDataKeyC] = get(a, [newKey, riskZoneDataKeyC], 0) + (riskData[riskZoneDataKeyC] || 0);
                    return riskZoneDataA
                }, {})
            }
            a[newKey] = Object.assign({}, a[newKey], tmp)
            return a
        }, {});

    data = Object.keys(data).map(gbvKey => data[gbvKey]);

    data.push(
        data.reduce((total, current) => {
            _.keys(current)
                .filter(key => key !== state.groupBy)
                .forEach(key => total[key] = get(total, [key], 0) + current[key])
            return total;
        }, {[state.groupBy]: 'Total'})
    )

    return {data, columns}
}

function renderTable(props, state, setState, cache) {
    if (!state.cols || !state.geo) return null;
    let data;
    if (!state.cachedData) {
        data = processData(state, cache);
        setState(Object.assign({}, state, {cachedData: data}));
        props.onChange(JSON.stringify(Object.assign({}, state, {cachedData: data, cachedDate: Date.now()})))
    } else {
        data = state.cachedData;
        data.columns = data.columns.map(c => Object.assign({}, c, {accessor: cc => formatMapping[c.format](cc[c.Header])}))
    }

    return <Table data={data.data} columns={data.columns} initialPageSize={Math.min(100, state.pageSize || 10)}
                  striped/>

}

function AssetsTable(props) {
    const {falcor, falcorCache} = useFalcor();
    const values = props.value ? JSON.parse(props.value) : {
        geo: 'County',
        cols: {},
        filterBy: null,
        filterByValue: [],
        groupBy: 'Jurisdiction',
        pageSize: null,
    }
    const [state, setState] =
        useState({
            geo: values.geo || null,
            cols: values.cols || {},
            filterBy: values.filterBy || null,
            filterByValue: values.filterByValue || [],
            groupBy: values.groupBy || null,
            pageSize: values.pageSize || null,
            cachedData: values.cachedData || null
        })
    const childGeo = nameMapping[state.geo];
    const activeGeo = '36'
    //activePlan = '63';
    useEffect(() => {
        if (!state.groupBy.length || !childGeo) return Promise.resolve();

        async function fetchData() {
            let response = await falcor.get(
                ["geo", activeGeo, childGeo]
            )

            response = get(response, ['json', 'geo', '36', childGeo], []);
            let scenarios = [3, 4, 9, 10, 38, 12, 14, 15, 16, 40, 18, 19, 41, 43, 22, 44, 23, 24, 25, 26, 46, 28, 29, 47,
                30, 49, 31, 52, 20, 27, 17, 33, 34, 13, 32, 42, 36, 35, 53, 54, 55, 56]; // Only DFIRMs

            let groupByValues = state.groupBy === 'Jurisdiction' ? response : filterByTypes.getValues(filterByTypes[state.groupBy]);

            let reqs = [
                ['geo', [activeGeo, ...response], ['name']],
                ['building', 'byGeoid', activeGeo, nameMapping[state.groupBy], groupByValues, 'sum', ['count', 'replacement_value']],
                ['building', 'byGeoid', activeGeo, nameMapping[state.groupBy], groupByValues, 'byRiskScenario', scenarios, 'byRiskZone', 'all']
            ];
            if (response.length) {
                await falcor.get(
                    ...reqs
                )
            }
        }

        return fetchData();
    }, [childGeo, falcor, falcorCache, state]);
    return (
        <div>
            {props.viewOnly ? null : renderMetaOptions(props, state, setState, falcorCache)}
            {props.viewOnly ? null : divider}
            {renderTable(props, state, setState, falcorCache)}
        </div>)
}

export default AssetsTable