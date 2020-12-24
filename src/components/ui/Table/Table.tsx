import { Box, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import cx from 'classnames';
import { ChevronDown, ChevronUp } from 'react-feather';
import {
  Column,
  IdType,
  Row,
  SortingRule,
  TableOptions,
  usePagination,
  UseRowSelectOptions,
  useSortBy,
  useTable
} from 'react-table';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { isEmpty } from 'lodash';

import {
  NoContent,
  StyledTable,
  StyledTableRowContainer,
  TableCell,
  TableHead,
  TableRow
} from './styles';
import {
  isRowSelectionCell,
  onClickCell,
  Paginator,
  rowSelectionHooks
} from './components';
import { Typography } from '../index';

export interface UseTableColumnOptions<D extends object> {
  relativeWidth: number;
}

// Use declaration merging to extend types
// https://github.com/tannerlinsley/react-table/commit/7ab63858391ebb2ff621fa71411157df19d916ba
declare module 'react-table' {
  export interface TableOptions<D extends object>
    extends UsePaginationOptions<D>,
      UseFiltersOptions<D>,
      UseSortByOptions<D> {}

  export interface TableInstance<D extends object = {}>
    extends UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D>,
      UseRowSelectInstanceProps<D> {}

  export interface TableState<D extends object = {}>
    extends UsePaginationState<D>,
      UseSortByState<D>,
      UseRowSelectState<D> {}

  export interface ColumnInstance<D extends object = {}>
    extends UseSortByColumnProps<D> {}

  export interface HeaderGroup<D extends object = {}>
    extends UseTableColumnOptions<D> {}
}

type CommonTableProps<D extends object = {}> = {
  /**
   * The data to display
   */
  data: D[];

  /**
   * If the data is currently loading
   */
  loading?: boolean;

  /**
   * Number of items in each page of the pagination
   */
  pageSize?: number;

  /**
   * Table heading
   */
  tableHeading?: React.ReactNode;

  /**
   * Column configuration
   */
  columns: Column<D>[];

  /**
   * Callback when a row is clicked
   *
   * @param row
   */
  onRowClick?: (row: Row<D>) => void;

  /**
   * The current pagination values
   */
  pageMeta?: {
    total: number;
    offset: number;
    limit: number;
  };

  /**
   * Define this prop with a callback that is used when
   * sorting or pagination changes
   *
   * @param limit
   * @param offset
   * @param sorting
   */
  reFetchData?: (
    limit: number,
    offset: number,
    sorting: SortingRule<string>[]
  ) => void;

  /**
   * The message to show when the table is empty
   */
  emptyMessage?: string;

  tableProps?: any;

  showEmptyRows?: boolean;
  /**
   * given item D it should extract unique identifier for item,
   * this is exact as keyExtractor in react-native FlatList
   * NOTE: for legacy reason this is option, in future release this will be required field
   */
  getRowId?: (item: D) => IdType<D>;
  onRowSelection?: (rows: IdType<D>[]) => void;
};

interface ControlledTableProps<D extends object = {}>
  extends CommonTableProps<D> {
  /**
   * to maintain selected row ids outside the table component pass this props and row ids must be passed via @selectedRowIds props
   */
  hasControlledSelection?: true;
  selectedRowIds?: IdType<D>[];
}

interface NormalTableProps<D extends object = {}> extends CommonTableProps<D> {
  hasControlledSelection?: false;
  selectedRowIds?: undefined;
}

type TableProps<D extends object = {}> =
  | ControlledTableProps<D>
  | NormalTableProps<D>;

const Table = <D extends {}>({
  columns,
  data,
  loading,
  tableHeading,
  pageMeta,
  onRowClick,
  reFetchData,
  emptyMessage,
  onRowSelection,
  tableProps,
  showEmptyRows = true,
  selectedRowIds,
  hasControlledSelection = false,
  getRowId
}: TableProps<D>) => {
  const tableData = data;
  const tableColumns = columns;

  /** adapting IDType array into Record **/
  const selectedRowIdState = React.useMemo(
    () =>
      (selectedRowIds ?? []).reduce(
        (accum, id) => ({
          ...accum,
          [id]: true
        }),
        {} as Record<IdType<D>, boolean>
      ),
    [selectedRowIds]
  );

  const options: TableOptions<D> & UseRowSelectOptions<D> = {
    data: tableData,
    columns: tableColumns,

    manualPagination: !!reFetchData,
    manualSortBy: !!reFetchData,
    autoResetSelectedRows: false,
    initialState: {
      pageSize: pageMeta?.limit ?? 10,
      pageIndex: 0,
      selectedRowIds: selectedRowIdState
    },
    ...(hasControlledSelection
      ? {
          useControlledState: (state) => {
            return {
              ...state,
              selectedRowIds: selectedRowIdState
            };
          }
        }
      : {}),
    getRowId,
    pageCount: pageMeta ? Math.ceil(pageMeta.total / pageMeta.limit) : undefined
  };

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { sortBy, pageIndex, pageSize }
  } = useTable<D>(
    options,
    useSortBy,
    usePagination,
    ...rowSelectionHooks(onRowSelection, {
      hasControlledSelection
    })
  );

  /** TODO refactor this and control this via hook only **/
  React.useEffect(() => {
    if (!hasControlledSelection) {
      onRowSelection?.(selectedFlatRows.map((row) => row.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows?.length]);

  // note: DO NOT add refetch data to the deps list or the component wil get
  // stuck in a render loop and i'm not 100% sure why because reFetchData should
  // always be wrapped in a useCallback
  useDeepCompareEffect(() => {
    if (reFetchData) {
      reFetchData(pageSize, pageIndex * pageSize, sortBy);
    }
  }, [pageSize, pageIndex, sortBy]);

  const emptyRowsCount = 10;

  return (
    <Box flexDirection="column" flex={1} maxWidth="100%" width="100%">
      {!!tableHeading && <Box>{tableHeading}</Box>}
      <StyledTable
        {...getTableProps()}
        {...tableProps}
        emptyRowsCount={emptyRowsCount}
      >
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <Flex
              flex={1}
              flexDirection="row"
              {...headerGroup.getHeaderGroupProps()}
              px={onRowSelection ? 0 : 2}
            >
              {headerGroup.headers.map((column, i) => (
                <TableCell
                  {...column.getHeaderProps()}
                  {...column.getSortByToggleProps()}
                  width={column.width}
                  isRowSelectionCell={isRowSelectionCell(onRowSelection, i)}
                >
                  <Typography as="span" variant="tableHeader">
                    {column.render('Header')}
                  </Typography>
                  {column.isSorted && (
                    <>
                      {column.isSortedDesc && <ChevronDown size={20} />}
                      {!column.isSortedDesc && <ChevronUp size={20} />}
                    </>
                  )}
                </TableCell>
              ))}
            </Flex>
          ))}
        </TableHead>
        <Flex flexDirection="column" position="relative">
          {!loading && page.length === 0 && isEmpty(data) && (
            <NoContent>
              <Text color="white">{emptyMessage || 'No Records'}</Text>
            </NoContent>
          )}
          <StyledTableRowContainer
            emptyRowsCount={emptyRowsCount}
            className={cx({ 'animate-shimmer': loading })}
          >
            {page.map((row) => {
              prepareRow(row);

              const rowProps: any = {
                ...row.getRowProps()
              };

              return (
                <TableRow
                  flexDirection="row"
                  {...rowProps}
                  clickable={onRowClick || onRowSelection}
                  px={onRowSelection ? 0 : 2}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <TableCell
                        justifyContent="flex-start"
                        {...cell.getCellProps()}
                        width={cell.column.width}
                        onClick={onClickCell(
                          row,
                          i,
                          onRowClick,
                          onRowSelection
                        )}
                        isRowSelectionCell={isRowSelectionCell(
                          onRowSelection,
                          i
                        )}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </StyledTableRowContainer>
        </Flex>
      </StyledTable>
      <Box flexDirection="row">
        <Paginator
          page={pageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
          gotoPage={gotoPage}
          pageCount={pageCount}
          canNextPage={canNextPage}
          canPrevPage={canPreviousPage}
        />
      </Box>
    </Box>
  );
};

export default Table;
