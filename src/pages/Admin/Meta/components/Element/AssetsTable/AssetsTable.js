import React, {useEffect, useState} from 'react'
import {Input, Select, Table, useFalcor} from '@availabs/avl-components'
import _ from 'lodash'
import get from 'lodash.get'
import filterByTypes from './meta'

const nameMapping = {
    'Jurisdiction': 'jurisdiction',
    'Owner Type': 'ownerType',
    'Land Use Type': 'propType',
    'County': 'counties',
    'Municipality': 'municipalities'
}

const keyCols = ['Jurisdiction', 'Owner Type', 'Land Use Type'];

function renderMetaOptions(props, state, setState, cache) {
    const handleChange = (e) => {
        setState(e)
        props.onChange(JSON.stringify(e))
    }
    const populateFilterByValues = () => {
        const childGeo = nameMapping[state.geo];

        return state.filterBy === 'Jurisdiction' ?
            get(cache, ['geo', '36', childGeo, 'value'], []).map(d => d) : //get(cache, ['geo', d, 'name'], 'No Name')
            (
                filterByTypes[state.filterBy] || []
            ).map(d => d.value)
    }

    return (
        <React.Fragment>
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
                domain={populateFilterByValues()}
                value={state.filterByValue.map(fbv => filterByTypes.getName(filterByTypes[state.groupBy], fbv))}
                onChange={e => handleChange(Object.assign({}, state, {filterByValue: e}))}
            />

            <label> Select Group By Column: </label>
            <Select
                key={'groupBy'}
                domain={keyCols}
                value={state.groupBy}
                onChange={e => handleChange(Object.assign({}, state, {
                    groupBy: e,
                    cols: _.uniqBy([e, ..._.difference(state.cols, keyCols)])
                }))}
                multi={false}
            />
            <label> Select Columns: </label>
            <Select
                key={'cols'}
                domain={[state.groupBy, 'Number of Assets', 'Value of Assets', ' # in 100 yr', '$ in 100 yr', '# in 500 yr', '$ in 500 yr']}
                value={_.uniqBy([state.groupBy, ...state.cols])}
                onChange={e => handleChange(Object.assign({}, state, {cols: e}))}
            />
            <label>Page Size</label>
            <Input
                key={'pageSize'}
                type={'number'}
                placeholder={'10'}
                value={state.pageSize}
                onChange={e => handleChange(Object.assign({}, state, {pageSize: parseInt(e)}))}
            />
        </React.Fragment>
    )
}

function processData(state, cache) {
    const childGeo = nameMapping[state.geo];
    const geoGraph = get(cache, ['geo', '36', childGeo, 'value'], []);
    const activeGeo = '36'
    let data = [],
        columns = [];

    if (!geoGraph || !geoGraph.length) return {data, columns};

    let graph = get(cache, ['building', 'byGeoid', activeGeo, nameMapping[state.groupBy]], {})

    data = filterByTypes.getValues(filterByTypes[state.groupBy])
            .reduce((a, gbvKey) => {
                let newKey = state.groupBy === 'Land Use Type' ? gbvKey - (gbvKey % 100) : gbvKey;

                a[newKey] = {
                    [state.groupBy]: filterByTypes.getName(filterByTypes[state.groupBy], newKey.toString()),
                    'Number of Assets': get(a, [newKey, 'Number of Assets'], 0) + parseInt(get(graph, [gbvKey, 'sum', 'count', 'value'], 0)),
                    'Value of Assets': get(a, [newKey, 'Value of Assets'], 0) + parseInt(get(graph, [gbvKey, 'sum', 'replacement_value', 'value'], 0))
                }
                return a
            }, {})
    data = Object.keys(data)
        .map(gbvKey => data[gbvKey])


    state.cols.forEach(column => {
            columns.push({
                Header: column,
                accessor: column,
                align: 'center'
            })
        }
    )

    return {data, columns}
}

function renderTable(state, cache) {
    if (!state.cols || !state.geo) return null;
    return <Table {...processData(state, cache)} initialPageSize={Math.min(100, state.pageSize || 10)}/>
}

function AssetsTable(props) {
    const {falcor, falcorCache} = useFalcor();
    const values = props.value ? JSON.parse(props.value) : {
        geo: 'County',
        cols: [],
        filterBy: null,
        filterByValue: [],
        groupBy: 'Owner Type',
        pageSize: null,
    }
    const [state, setState] =
        useState({
            geo: values.geo || null,
            cols: values.cols || [],
            filterBy: values.filterBy || null,
            filterByValue: values.filterByValue || [],
            groupBy: values.groupBy || null,
            pageSize: values.pageSize || null
        })
    const childGeo = nameMapping[state.geo];
    const activeGeo = '36',
        activePlan = '63';
    useEffect(() => {
        if (!state.groupBy.length || !childGeo) return Promise.resolve();

        async function fetchData() {
            let response = await falcor.get(
                ["geo", activeGeo, childGeo],
                ['plan', activePlan, 'scenarios']
            )

            response = get(response, ['json', 'geo', '36', childGeo], []);
            let scenarios = get(response, ['json', 'plan', activePlan, 'scenarios'], []);

            let reqs = [
                ['geo', [activeGeo, ...response], ['name']],
                ['building', 'byGeoid', activeGeo, nameMapping[state.groupBy], filterByTypes.getValues(filterByTypes[state.groupBy]), 'sum', ['count', 'replacement_value']],
            ];

            if (scenarios) {
                scenarios = scenarios.filter(f => f.name.includes('DFIRM')).map(f => f.id);
                reqs.push(['building', 'byGeoid', activeGeo, nameMapping[state.groupBy], filterByTypes.getValues(filterByTypes[state.groupBy]), 'byRiskScenario', scenarios, 'byRiskZone', 'all'])
                console.log('sc?', scenarios)
            }
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

            {renderTable(state, falcorCache)}
        </div>)
}

export default AssetsTable