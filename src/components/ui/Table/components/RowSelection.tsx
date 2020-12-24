import { Hooks, useRowSelect } from 'react-table';
import React from 'react';
import './RowSelection.css';
import { pickBy, uniq, pick } from 'lodash';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <div className="container">
          <input type="checkbox" ref={resolvedRef} {...rest} />
          <span className="background" />
        </div>
      </>
    );
  }
);

function createControlledCellProps({
  state,
  onRowSelection,
  hasControlledSelection,
  rowId
}) {
  const selectedRowIdsMap = pickBy(state?.selectedRowIds);
  const selectedRowIds = Object.keys(state?.selectedRowIds);

  function onRowSelectionChange(id: string, checked: boolean) {
    if (checked) {
      onRowSelection?.(uniq([...(selectedRowIds ?? []), id]));
    } else {
      onRowSelection?.(selectedRowIds?.filter((itemId) => itemId !== id));
    }
  }

  return hasControlledSelection
    ? {
        checked: selectedRowIdsMap?.[rowId],
        onChange: (event) => {
          const checked = event.target.checked;
          onRowSelectionChange?.(rowId, checked);
        }
      }
    : {};
}

function createControlledSelectAllProps({
  state,
  onRowSelection,
  hasControlledSelection,
  rowIds
}) {
  const selectedRowIdsMap = pickBy(state?.selectedRowIds);
  const selectedRowIds = Object.keys(selectedRowIdsMap);

  function onRowSelectionChange(checked: boolean) {
    const rowIdsSet = new Set(rowIds);
    if (checked) {
      onRowSelection?.(uniq(rowIds ?? []));
    } else {
      onRowSelection?.(
        selectedRowIds?.filter((itemId) => !rowIdsSet.has(itemId))
      );
    }
  }

  const selectedRowLength = Object.keys(pick(state?.selectedRowIds, rowIds))
    .length;
  const isSelectedAll =
    selectedRowLength === rowIds.length && selectedRowLength > 0;
  return hasControlledSelection
    ? {
        checked: isSelectedAll,
        onChange: (event) => {
          const checked = event.target.checked;
          onRowSelectionChange?.(checked);
        }
      }
    : {};
}

/**
 * If onRowSelection is passed as a prop to the table then we should inject the
 * on row selection hooks to display the checkboxes
 *
 * @param onRowSelection
 * @param hasControlledSelection
 *  if selectedRowIds is passed as props to Table component and parent is maintaining it's state then this needs to be ture
 * @param selectedRowIds
 */
export function rowSelectionHooks<D extends object = {}>(
  onRowSelection: Function | undefined,
  {
    hasControlledSelection
  }: {
    hasControlledSelection?: boolean;
  } = {}
): any {
  if (!onRowSelection) {
    return [];
  }

  return [
    useRowSelect,
    (hooks: Hooks<D>) => {
      hooks.visibleColumns.push((c) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({
            getToggleAllPageRowsSelectedProps,
            state,
            data,
            getRowId
          }: any) => {
            const controlledProps = createControlledSelectAllProps({
              state,
              onRowSelection,
              hasControlledSelection,
              rowIds: data.map(getRowId)
            });
            return (
              <IndeterminateCheckbox
                {...getToggleAllPageRowsSelectedProps()}
                {...controlledProps}
              />
            );
          },
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row, state }) => {
            const rowId = row.original.id;
            const toggleRowSelectedProps = row.getToggleRowSelectedProps();

            const controlledProps = createControlledCellProps({
              rowId,
              state,
              onRowSelection,
              hasControlledSelection
            });
            return (
              <IndeterminateCheckbox
                {...toggleRowSelectedProps}
                {...controlledProps}
              />
            );
          }
        },
        ...c
      ]);
    }
  ];
}

const noop = () => {};

/**
 * Determine what happens when a user clicks on a specific cell
 *
 * @param row
 * @param index
 * @param onClick
 * @param onRowSelection
 */
export function onClickCell(
  row: any,
  index: number,
  onClick: Function | undefined,
  onRowSelection: Function | undefined
) {
  if (!onClick) {
    return noop;
  }

  if (!onRowSelection || index > 0) {
    return () => onClick(row);
  }

  return noop;
}

/**
 * Determine if this cell is the row selection cell
 *
 * @param onRowSelection
 * @param index
 */
export function isRowSelectionCell(
  onRowSelection: Function | undefined,
  index: number
): boolean {
  return !!onRowSelection && index === 0;
}
