import React, { useState, useEffect } from 'react';
import {
  Table, Button, Icon, Checkbox,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Immutable, { fromJS, Map } from 'immutable';
import classNames from 'classnames/bind';

import LoadingCurtain from '../LoadingCurtain';
import './styles.scss';

/*
 * No items component.
 */
const NoItems = (props) => {
  const { hasActions, message, columns } = props;
  return (
    <Table.Row>
      <Table.Cell colSpan={hasActions ? columns : columns - 1} textAlign="center">
        {message}
      </Table.Cell>
    </Table.Row>
  );
};

NoItems.propTypes = {
  hasActions: PropTypes.bool,
  message: PropTypes.node,
  columns: PropTypes.number,
};

/*
 * TableCell component.
 */
const TableCell = (props) => {
  const {
    row, openEditId, formEdit, isModeForm, activeRow, columns,
    actions, setActiveRow, customRequest, actionsWithHover, checkedRows,
  } = props;

  const id = row.get('id');
  useEffect(() => { customRequest(row); });

  if (id === openEditId && formEdit && isModeForm) {
    return (
      <Table.Row key={id}>
        <Table.Cell colSpan="4">
          {formEdit}
        </Table.Cell>
      </Table.Row>
    );
  }

  const printTableCell = (column, itemId) => {
    const path = column.key.split('.');
    if (typeof column.component === 'function') {
      if (actionsWithHover && checkedRows && !column.withoutChek) {
        return (
          <React.Fragment>
            <div className={actionsWithHover ? 'show-actions' : 'hide-actions'}>
              {!row.get('checked') && (
                <Checkbox
                  checked={row.get('checked')}
                  onClick={() => { column.onChecked(itemId); }}
                />
              )}
            </div>
            {row.get('checked') && (
              <Checkbox
                checked={row.get('checked')}
                onClick={() => { column.onChecked(itemId); }}
              />
            )
            }
            {!row.get('checked') && (
              <div className="avatar">
                {column.component(row.getIn(path))}
              </div>
            )
            }
          </React.Fragment>
        );
      }
      return column.component(row.getIn([path[0]]), row.getIn([path[1]]));
    }
    return row.getIn(path);
  };

  return (
    <Table.Row key={id} active={id === activeRow} className={classNames({ 'custom-hover': actionsWithHover })}>
      {
        columns.map(column => (
          <Table.Cell key={column.key} width={column.width} className="custom-cell" textAlign={column.textAlign}>
            {
              printTableCell(column, id)
            }
          </Table.Cell>
        ))
      }

      {
        !!actions.length && (
          <Table.Cell className="custom-cell" width={1}>
            <div className={classNames({ 'show-actions': actionsWithHover })}>
              {
                actions.map((action) => {
                  const { key, component } = action;
                  if (component) {
                    return (
                      <React.Fragment key={key}>
                        {React.cloneElement(component, {
                          value: row,
                          onClick: () => {
                            setActiveRow(id);
                          },
                        })}
                      </React.Fragment>
                    );
                  }

                  return (
                    <Button
                      key={action.icon || key}
                      className={action.className}
                      size="tiny"
                      data-testid="test-action"
                      icon
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        action.onClick(row);
                      }}
                    >
                      <Icon name={action.icon} />
                    </Button>
                  );
                })

              }
            </div>
          </Table.Cell>
        )
      }
    </Table.Row>
  );
};

TableCell.defaultProps = {
  customRequest: () => { },
};

TableCell.propTypes = {
  row: PropTypes.instanceOf(Map),
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    onClick: PropTypes.func,
  })),
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    onClick: PropTypes.func,
    width: PropTypes.number,
  })),

  isModeForm: PropTypes.bool,
  openEditId: PropTypes.string,
  formEdit: PropTypes.node,
  setActiveRow: PropTypes.func,
  activeRow: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),
  customRequest: PropTypes.func,
  actionsWithHover: PropTypes.bool,
  checkedRows: PropTypes.bool,
};

/*
 * Action Header Cell component
 */
const ActionHeaderCell = (props) => {
  const {
    column, onSortChange, children,
  } = props;

  const handleClick = () => {
    if (column.sort) {
      onSortChange(column);
    }
  };
  const direction = column.direction ? ActionHeaderCell.Sort.ASCENDING : ActionHeaderCell.Sort.DESCENDING;
  const color = column.active ? ActionHeaderCell.Sort.ACTIVE_COLOR : ActionHeaderCell.Sort.INACTIVE_COLOR;

  return (
    <Table.HeaderCell
      key={column.key}
      width={column.width}
      className="custom-cell"
      onClick={handleClick}
      textAlign={column.textAlign || null}
    >
      {children}
      {column.sort
        && (
          <div className="icon-sort">
            <Icon name={direction} color={color} />
          </div>
        )}
    </Table.HeaderCell>
  );
};

ActionHeaderCell.Sort = {
  ASCENDING: 'sort up',
  DESCENDING: 'sort down',
  ACTIVE_COLOR: 'black',
  INACTIVE_COLOR: 'grey',
};

ActionHeaderCell.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.string,
    active: PropTypes.bool,
  }),
  onSortChange: PropTypes.func,
  children: PropTypes.node,
};

/*
 * Custom Table component.
 */
const CustomTable = (props) => {
  const {
    columns, data, actions, fixed, loading, isModeForm, formCreate, openEditId, formEdit,
    onBottomVisible, columnsForm, onSortChange, emptyMessage, heightTable, customRequestByCell,
    actionsWithHover, checkedRows,
  } = props;

  const [activeRow, setActiveRow] = useState('');

  const headerCells = column => (
    <ActionHeaderCell
      key={column.key}
      className="custom-cell"
      column={column}
      onSortChange={onSortChange}
    >
      {column.name}
    </ActionHeaderCell>
  );
  const containerClass = classNames({ 'table-fixed': fixed, 'table-empty': !data.size });
  const onScroll = (e) => {
    const item = e.target;
    if (item.offsetHeight + item.scrollTop >= item.scrollHeight) {
      onBottomVisible();
    }
  };
  return (
    <div className="custom-table">
      <LoadingCurtain loading={loading} />
      <div className={classNames({ 'custom-header': fixed })}>
        <Table className="table-header" fixed>
          <Table.Header>
            <Table.Row>
              {columns.map(headerCells)}
              {!!actions.length && <Table.HeaderCell className="custom-cell" width={1}></Table.HeaderCell>}
            </Table.Row>
          </Table.Header>
        </Table>
      </div>
      <div className={containerClass} style={{ height: heightTable }} onScroll={onScroll}>
        <Table fixed>
          <Table.Body>
            {
              isModeForm && !openEditId
              && (
                <Table.Row>
                  <Table.Cell colSpan={columnsForm}>
                    {formCreate}
                  </Table.Cell>
                </Table.Row>
              )
            }
            {!!data.size && data.map(row => (
              <TableCell
                key={row.get('id')}
                row={row}
                openEditId={openEditId}
                formEdit={formEdit}
                isModeForm={isModeForm}
                activeRow={activeRow}
                columns={columns}
                actions={actions}
                setActiveRow={setActiveRow}
                customRequest={customRequestByCell}
                actionsWithHover={actionsWithHover}
                checkedRows={checkedRows}
              />
            ))}
            {!data.size && <NoItems hasActions={!!actions.length} message={emptyMessage} columns={columns.length} />}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

CustomTable.defaultProps = {
  actions: [],
  columns: [],
  data: fromJS([]),
  fixed: false,
  loading: false,
  isModeForm: false,
  onBottomVisible: () => { },
  columnsForm: 4,
  onSortChange: () => { },
  emptyMessage: <div>No items</div>,
  heightTable: '74vh',
  actionsWithHover: false,
  checkedRows: false,
};

CustomTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    onClick: PropTypes.func,
  })),
  heightTable: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    onClick: PropTypes.func,
    width: PropTypes.number,
  })),
  data: PropTypes.instanceOf(Immutable.List),
  fixed: PropTypes.bool,
  loading: PropTypes.bool,
  isModeForm: PropTypes.bool,
  formCreate: PropTypes.node,
  openEditId: PropTypes.string,
  formEdit: PropTypes.node,
  onBottomVisible: PropTypes.func,
  columnsForm: PropTypes.number,
  onSortChange: PropTypes.func,
  emptyMessage: PropTypes.node,
  customRequestByCell: PropTypes.func,
  actionsWithHover: PropTypes.bool,
  checkedRows: PropTypes.bool,
};

export default CustomTable;
