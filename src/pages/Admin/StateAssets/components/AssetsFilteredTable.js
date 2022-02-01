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
    'Agency': 'agency',
    'Critical': 'critical',
    'Land Use Type': 'propType',
    'County': 'counties',
    'Municipality': 'municipalities',
    'Annual 1%': '100 yr',
    'Annual 0.2%': '500 yr',
}

function processData(state, cache) {
    const childGeo = nameMapping[state.geo];
    const geoGraph = get(cache, ['geo', '36', childGeo, 'value'], []);
    const activeGeo = '36'
    let data = [],
        columns = columnsForTable(state);

    if (!geoGraph || !geoGraph.length) return {data, columns};

    let graph = get(cache, ['building', 'byGeoid', activeGeo, state.groupBy === 'Critical' ? nameMapping[state.groupBy] + 'Grouped' : nameMapping[state.groupBy]], {});
    let riskMappings = _.get(cache, ['building', 'byGeoid', 36, nameMapping[state.groupBy]], {})

    data = (state.groupBy === 'Jurisdiction' ? geoGraph : state.groupBy === 'Agency' ? filterByTypes.getNames(filterByTypes[state.groupBy]) : filterByTypes.getValues(filterByTypes[state.groupBy]))
        .filter(gbvKey => state.filterByValue.includes(gbvKey) || !state.filterByValue.length)
        .reduce((a, gbvKey) => {
            gbvKey = state.groupBy === 'Agency' ? gbvKey : parseInt(gbvKey)

            let newKey = ['Land Use Type', 'Critical'].includes(state.groupBy) ? gbvKey - (gbvKey % 100) : gbvKey;

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
            console.log('??', state.groupBy)
            let tmp = {
                [state.groupBy]:
                    state.groupBy === 'Jurisdiction' ?
                        get(cache, ['geo', newKey, 'name']) :
                            state.groupBy === 'Agency' ? newKey :
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
    console.log('c?', columns, data)
    return {data, columns}
}

function renderTable(props, state, setState, cache) {
    if (!state.cols || !state.geo) return null;
    let data;

    data = processData(state, cache);

    return <Table data={data.data} columns={data.columns} initialPageSize={Math.min(100, state.pageSize || 10)}
                  striped/>

}

function AssetsTable(props) {
    const {falcor, falcorCache} = useFalcor();
    const values = props
    const [state, setState] =
        useState({
            geo: values.geo || null,
            cols: values.cols || {},
            filterBy: values.filterBy || null,
            filterByValue: values.filterByValue || [],
            groupBy: values.groupBy || null,
            pageSize: values.pageSize || null,
            loading: false
        })
    const childGeo = nameMapping[state.geo];
    const activeGeo = '36'

    useEffect(() => {
        if (!state.groupBy.length || !childGeo) return Promise.resolve();

        async function fetchData() {
            setState(Object.assign(state, {loading: true}))
            let response = await falcor.get(
                ["geo", activeGeo, childGeo]
            )

            response = get(response, ['json', 'geo', '36', childGeo], []);
            let scenarios = [3, 4, 9, 10, 38, 12, 14, 15, 16, 40, 18, 19, 41, 43, 22, 44, 23, 24, 25, 26, 46, 28, 29, 47,
                30, 49, 31, 52, 20, 27, 17, 33, 34, 13, 32, 42, 36, 35, 53, 54, 55, 56]; // Only DFIRMs

            let groupByValues = state.groupBy === 'Jurisdiction' ? response :
                state.groupBy === 'Agency' ? filterByTypes.getNames(filterByTypes[state.groupBy]) :
                    filterByTypes.getValues(filterByTypes[state.groupBy]);

            let reqs = [
                ['geo', [activeGeo, ...response], ['name']],
                ['building', 'byGeoid', activeGeo, state.groupBy === 'Critical' ? nameMapping[state.groupBy] + 'Grouped' : nameMapping[state.groupBy], groupByValues, 'sum', ['count', 'replacement_value']],
                ['building', 'byGeoid', activeGeo, nameMapping[state.groupBy], groupByValues, 'byRiskScenario', scenarios, 'byRiskZone', 'all']
            ];

            console.log('reqs', reqs)
            if (response.length) {
                await falcor.get(
                    ...reqs
                )
            }
            setState(Object.assign(state, {loading: false}))
        }

        return fetchData();
    }, [childGeo, falcor, falcorCache, state]);
    console.log('data?', falcorCache)
    return (
        <div>
            {state.loading ? 'loading...' : ''}
          {/*  {props.viewOnly ? null : renderMetaOptions(props, state, setState, falcorCache)}
            {props.viewOnly ? null : divider}*/}
            {renderTable(props, state, setState, falcorCache)}
        </div>)
}

export default AssetsTable