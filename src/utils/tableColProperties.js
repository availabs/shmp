import React from "react";
import {BooleanInput, List, ListItemRemovable, Select} from "@availabs/avl-components";
import get from "lodash.get";
import _ from "lodash";
import {fnum} from "./fnum";

export const formatMapping = {
    undefined: (d) => d,
    null: (d) => d,
    'None': (d) => d,
    'Number': d => fnum(d, false),
    '$ Amount': d => fnum(d, true)
}

export const columnsForMeta = (columns = [], state = {}) => {
    return columns.reduce((acc, col) => {
        console.log('state', state.cols, col)
        acc[col] = {
            disableFilters: get(state.cols, [col, 'disableFilters'], true),
            disableSortBy: get(state.cols, [col, 'disableSortBy'], false),
            format: get(state.cols, [col, 'format'])
        };
        return acc;
    }, {})
}

export const columnsForTable = (state) => {
    let columns = [];
    _.keys(get(state, `cols`, {})).forEach(column => {
            columns.push({
                Header: column,
                accessor: c => formatMapping[get(state, ['cols', column, 'format'], 'None')](c[column]), //fnum(c[column], get(state, ['cols', column, 'format'], null) === '$ Amount'),
                align: 'center',
                ...state.cols[column],
            })
        }
    )

    return columns;
}

export function colProperties(state, handleChange) {
    if (typeof state.cols[0] === "string") {
        handleChange(Object.assign({}, state, {cols: {}}))
        return 'Select Columns again to update internal structure to latest.'
    }
    return (
        <React.Fragment>
            <p>Select Properties</p>
            <List className={'bg-blue-50 hover:bg-blue-50'}>
                {Object.keys(state.cols)
                    .map(column =>
                        <ListItemRemovable
                            className={'bg-blue-50 hover:bg-blue-50'}
                            item={
                                <React.Fragment>
                                    <p>{column}</p>
                                    <List className={'bg-blue-50 hover:bg-blue-50'}>
                                        <ListItemRemovable
                                            className={'bg-blue-50 hover:bg-blue-50'}
                                            item={
                                                <React.Fragment>
                                                    <label>Sort</label>
                                                    <BooleanInput
                                                        value={!(!!get(state, ['cols', column, 'disableSortBy'], false))}
                                                        onChange={d => {
                                                            state.cols[column].disableSortBy = !d;
                                                            handleChange(
                                                                state
                                                            )
                                                        }
                                                        }/>
                                                    <label>Filter</label>
                                                    <BooleanInput
                                                        value={!(!!get(state, ['cols', column, 'disableFilters'], false))}
                                                        onChange={d => {
                                                            state.cols[column].disableFilters = !d;
                                                            handleChange(
                                                                state
                                                            )
                                                        }
                                                        }/>
                                                    <label>Format</label>
                                                    <Select
                                                        domain={['None', 'Number', '$ Amount']}
                                                        value={get(state, ['cols', column, 'format'], null)}
                                                        onChange={e => {
                                                            state.cols[column].format = e
                                                            handleChange(state)
                                                        }}
                                                        multi={false}
                                                    />
                                                </React.Fragment>
                                            }
                                        />
                                    </List>
                                </React.Fragment>
                            }
                        />
                    )}
            </List>
        </React.Fragment>
    )
}