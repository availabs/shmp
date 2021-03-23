import React, {useEffect, useState} from 'react'
import {Select, Table, Input, useFalcor} from '@availabs/avl-components'
import _ from 'lodash'
import get from 'lodash.get'

function renderMetaOptions(props, state, setState) {
    const handleChange = (e) => {
        setState(e)
        props.onChange(JSON.stringify(e))
    }

    return (
        <React.Fragment>
            <label> Select Geography Level: </label>
            <Select
                key={'geo'}
                domain={['State', 'County', 'Municipality']}
                value={state.geo}
                onChange={e => handleChange({geo: e, cols: state.cols, pageSize: state.pageSize})}
                multi={false}
            />
            <label> Select Columns: </label>
            <Select
                key={'cols'}
                domain={['Jurisdiction', 'total losses', 'closed losses', 'open losses', 'cwop losses', 'total payments']}
                value={_.uniqBy(['Jurisdiction', ...state.cols])}
                onChange={e => handleChange({geo: state.geo, cols: e, pageSize: state.pageSize})}
            />
            <label>Page Size</label>
            <Input
                key={'pageSize'}
                type={'number'}
                placeholder={'10'}
                value={state.pageSize}
                onChange={e => handleChange({geo: state.geo, cols: state.cols, pageSize: parseInt(e)})}
                />
        </React.Fragment>
    )
}

function processData(state, cache) {
    const childGeo = state.geo === 'State' ? 'counties' : 'municipalities';
    const geoGraph = get(cache, ['geo', '36', childGeo, 'value'], [])
    let data = [],
        columns = [];

    if (!geoGraph || !geoGraph.length) return {data, columns};

    geoGraph
        .filter(geoId => childGeo === 'counties' ? geoId.length === 5 : geoId.length > 5)
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

function NFIPTable(props) {
    const {falcor, falcorCache} = useFalcor();
    const values = props.value ? JSON.parse(props.value) : {geo: null, cols: [], pageSize: null}
    const [state, setState] = useState({'geo': values.geo || null, 'cols': values.cols || [], 'pageSize': values.pageSize || null})
    const childGeo = state.geo === 'State' ? 'counties' : 'municipalities';

    useEffect(() => {
        async function fetchData() {
            let response = await falcor.get(["geo", '36', childGeo])
            response = get(response, `json.geo.36.${childGeo}`, [])

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
            {props.viewOnly ? null : renderMetaOptions(props, state, setState)}

            {renderTable(state, falcorCache)}
        </div>)
}

export default NFIPTable