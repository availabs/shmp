import React from 'react'
import {
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
  useExpanded
} from 'react-table'

import { Button } from "../Button"

import { matchSorter } from 'match-sorter'

import { useTheme } from "../../wrappers/with-theme"

const DefaultColumnFilter = ({ column }) => {
  const {
      filterValue = "",
      // preFilteredRows,
      setFilter
    } = column;
    // count = preFilteredRows.length;
  const theme = useTheme();
  return (
    <div className="w-3/4">
      <input className={ theme.inputSmall }
        value={ filterValue } onChange={ e => setFilter(e.target.value) }
        onClick= { e => e.stopPropagation() }
        placeholder={ `Search...` }/>
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

const getPageSpread = (page, maxPage) => {
	let low = page - 2,
		high = page + 2;

	if (low < 0) {
		high += -low;
		low = 0;
	}
	if (high > maxPage) {
		low -= (high - maxPage);
		high = maxPage;
	}
  const spread = [];
  for (let i = Math.max(0, low); i <= Math.min(maxPage, high); ++i) {
    spread.push(i);
  }
  return spread;
}

const DefaultExpandedRow = ({ values }) =>
  <div className="flex">
    { values.map(({ key, value }, i) =>
        <div key={ key || `key-${ i }` } className="flex-1">
          { key ? <b>{ key }:</b> : null }
          <span className="ml-1">{ value }</span>
        </div>
      )
    }
  </div>

export default ({ columns = [], data = [],
                  sortBy, sortOrder,
                  initialPageSize = 10,
                  onRowClick,
                  ExpandRow = DefaultExpandedRow,
                  disableFilters = false,
                  disableSortBy = false,
                  ...props }) => {
    const theme = useTheme();
    const filterTypes = React.useMemo(
      () => ({
        fuzzyText: fuzzyTextFilterFn
      }), []
    );

    const defaultColumn = React.useMemo(
      () => ({ Filter: DefaultColumnFilter }), []
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      rows,
      preFilteredRows,
      prepareRow,
      canPreviousPage,
      canNextPage,
      gotoPage,
      previousPage,
      nextPage,
      pageCount,
      visibleColumns,
      toggleRowExpanded,
      state: {
        pageSize,
        pageIndex,
        expanded
      }
    } = useTable(
      { columns,
        data,
        defaultColumn,
        filterTypes,
        disableFilters,
        disableSortBy,
        initialState: {
          pageSize: initialPageSize,
          sortBy: [{ id: sortBy, desc: sortOrder === "desc" }]
        }
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      useExpanded,
      usePagination
    );
    if (!preFilteredRows.length) return null;

    return (
      <div className="overflow-auto scrollbar-sm">
        <table { ...getTableProps() } className="w-full">
          <thead>
            { headerGroups.map(headerGroup =>
                <tr { ...headerGroup.getHeaderGroupProps() }>
                  { headerGroup.headers
                      .map(column =>
                        <th { ...column.getHeaderProps(column.getSortByToggleProps()) }
                          className={ theme.tableHeader }>
                          <div className="flex">
                            <div className="flex-1">{ column.render("Header") }</div>
                            { !column.isSorted ? null :
                              <div className="flex-0 mr-8">
                                { column.isSortedDesc ?
                                    <i className="ml-2 pt-1 fas fa-chevron-down"/> :
                                    <i className="ml-2 pt-1 fas fa-chevron-up"/>
                                }
                              </div>
                            }
                          </div>
                          { !column.canFilter ? null : <div>{ column.render('Filter') }</div> }
                        </th>
                      )
                  }
                </tr>
              )
            }
            { pageCount <= 1 ? null :
              <tr className={ theme.tableInfoBar }>
                <td colSpan={ columns.length } className="px-2">
                  <div className={ `flex items-center ${ theme.textInfo }` }>
                    <div className="flex-0">
                      Page { pageIndex + 1 } of { pageCount }
                      <span className="font-extrabold">&nbsp; | &nbsp;</span>
                      Rows { pageIndex * pageSize + 1 }-
                      { Math.min(rows.length, pageIndex * pageSize + pageSize) } of { rows.length }
                    </div>
                    <div className={ `flex-1 flex justify-end items-center` }>
                      <Button disabled={ pageIndex === 0 } buttonTheme="textbuttonInfoSmall"
                        onClick={ e => gotoPage(0) }>
                        { "<<" }
                      </Button>
                      <Button disabled={ !canPreviousPage } buttonTheme="textbuttonInfoSmall"
                        onClick={ e => previousPage() }>
                        { "<" }
                      </Button>
                      { getPageSpread(pageIndex, pageCount - 1)
                          .map(p => {
                            const active = (p === pageIndex);
                            return (
                              <Button key={ p } buttonTheme="textbuttonInfo"
                                active={ active } large={ active } small={ !active }
                                onClick={ active ? null : e => gotoPage(p) }>
                                { p + 1 }
                              </Button>
                            )
                          })
                      }
                      <Button disabled={ !canNextPage } buttonTheme="textbuttonInfoSmall"
                        onClick={ e => nextPage(0) }>
                        { ">" }
                      </Button>
                      <Button disabled={ pageIndex === (pageCount - 1) } buttonTheme="textbuttonInfoSmall"
                        onClick={ e => gotoPage(pageCount - 1) }>
                        { ">>" }
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            }
          </thead>
          <tbody { ...getTableBodyProps() }>
            { page.map(row => {
                const { onClick, expand = [] } = row.original;
                prepareRow(row);
                return (
                  <React.Fragment key={ row.getRowProps().key }>
                    <tr { ...row.getRowProps() }
                      className={ `
                        ${ props.striped ? theme.tableRowStriped : theme.tableRow }
                        ${ (onClick || onRowClick) ? "cursor-pointer" : "" }
                      ` }
                      onClick={ e => {
                        (typeof onRowClick === "function") && onRowClick(e, row);
                        (typeof onClick === "function") && onClick(e, row);
                      } }>
                        { row.cells.map((cell, ii) =>
                            <td { ...cell.getCellProps() } className={ theme.tableCell }>
                              { (ii > 0) || ((row.subRows.length === 0) && (expand.length === 0)) ?
                                  cell.render('Cell')
                                :
                                  <div className="flex items-center">
                                    <div className="flex-1">{ cell.render('Cell') }</div>
                                    <div onClick={ e => {
                                      e.stopPropagation();
                                      Object.keys(expanded).filter(k => k !== row.id)
                                        .forEach(toggleRowExpanded);
                                      row.toggleRowExpanded(!row.isExpanded);
                                    } } className={ `
                                        flex item-center justify-center py-1 px-2 rounded
                                        hover:${ theme.accent3 } ${ theme.transition }
                                      ` }>
                                      { row.isExpanded ?
                                        <i className="fas fa-chevron-up"/> :
                                        <i className="fas fa-chevron-down"/>
                                      }
                                    </div>
                                  </div>
                              }
                            </td>
                          )
                        }
                    </tr>
                    { !row.isExpanded || !expand.length ? null :
                      <tr className={ theme.tableRow }>
                        <td colSpan={ visibleColumns.length } className={ theme.tableCell }>
                          <ExpandRow values={ expand }/>
                        </td>
                      </tr>
                    }
                  </React.Fragment>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
}
