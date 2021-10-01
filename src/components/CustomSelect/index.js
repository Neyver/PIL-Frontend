import React, { useState, useEffect } from 'react';
import {
  Form, Dropdown, Icon, Item, Input, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './styles.scss';

const MIN_ITEMS = 5;

const buildOptions = (mappedItems = [], keysToRemove = [], localSelection) => {
  const mappedItemsWithoutAdded = mappedItems.filter(option => !keysToRemove.includes(option.id));
  return [...mappedItemsWithoutAdded, ...localSelection];
};

const CustomSelect = (props) => {
  const {
    options, getMoreItems, onSearchChange, onChange, name, label, className, loading,
    additionalItem, stateError, setStateError, errorMessage, disabled, onBlur, selectOnBlur,
    newItemConfig, multiple = false, noResult, ...nextProps
  } = props;

  const [newItemSelected, setNewItemSelected] = useState(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const [localSelection, setLocalSelection] = useState([]);
  const [localQuery, setLocalQuery] = useState('');

  const handleOnChange = (e, data) => {
    const { options: optionsSelect = [], value: selectedValues = [] } = data;
    let candidatesToAdd = localSelection;
    const lastSelectedKey = selectedValues[selectedValues.length - 1];

    if (selectedValues.length > localSelection.length) { // Adding
      const current = optionsSelect.filter(option => option.value === lastSelectedKey);
      candidatesToAdd = [...localSelection, ...current];
    } else { // Removing
      candidatesToAdd = localSelection.filter(option => selectedValues.includes(option.key));
    }
    setLocalSelection(candidatesToAdd);
    onChange(e, data);
  };

  useEffect(() => {
    if (options.length <= MIN_ITEMS && !loading) {
      getMoreItems();
    }
  }, [loading, options]);

  const newItemOption = {
    key: `new-${name}`,
    text: '',
    value: '',
    onClick: () => setNewItemSelected(true),
    className: 'add-new-item',
    content: newItemConfig.action,
  };

  let items = options;
  if (additionalItem) {
    items = options.concat(newItemOption);
    items = [...new Set(items)];
  }

  let newOptions = [];
  newOptions = buildOptions(options, [], localSelection);

  const handleOnSearch = (event) => {
    const searchValue = event.target.value || '';
    onSearchChange(searchValue);
    setLocalQuery(searchValue);
  };

  const handleScroll = (event) => {
    const menuDropdown = event.currentTarget.children[3];
    if (menuDropdown.scrollTop + menuDropdown.clientHeight >= menuDropdown.scrollHeight) {
      if (!loading) {
        getMoreItems();
      }
    }
  };

  const onFocus = () => {
    setStateError(name, false);
    if (!multiple) {
      onSearchChange('');
    }
  };

  const handleOnBlur = (data) => {
    onBlur(data);
    setStateError(name, true);
  };

  const handleOnBlurInput = (event) => {
    if (!event.target.value) {
      setNewItemSelected(false);
    } else {
      setCloseIcon(true);
    }
    handleOnBlur(event.target.value);
  };

  const handleOnFocusInput = () => {
    setCloseIcon(false);
    onFocus();
  };

  const actionInput = closeIcon ? {
    icon: 'close',
    onClick: () => {
      setCloseIcon(false);
      setNewItemSelected(false);
    },
    className: 'close-icon',
  } : null;

  if (newItemSelected) {
    const classInput = classNames('input-item', { 'input-item-error': errorMessage && stateError });

    return (
      <div className={classInput}>
        {label && <label htmlFor={name} className="input-new-label">{label}</label>}
        <Input
          name={name}
          className={classNames({ 'new-item': closeIcon })}
          fluid
          onBlur={handleOnBlurInput}
          onChange={onChange}
          action={actionInput}
          autoFocus
          onFocus={handleOnFocusInput}
          placeholder={newItemConfig.placeholder}
          disabled={disabled}
        />
        <label htmlFor={name} className="input-label">
          {stateError && errorMessage ? errorMessage : '\u00A0'}
        </label>
      </div>
    );
  }

  const noResultsMessage = noResult
    ? (
      <div className="no-result-item">
        {noResult}
        <Divider horizontal />
        { additionalItem && (
          <Item onClick={() => setNewItemSelected(true)}>
            {newItemConfig.action}
          </Item>
        )}
      </div>
    )
    : null;

  if (multiple) {
    nextProps.searchQuery = localQuery;
  }

  return (
    <div className="custom-select">
      <Form.Field
        error={Boolean(stateError && errorMessage)}
        disabled={disabled}
      >
        <label htmlFor={name}>{label}</label>
        <Dropdown
          key={name}
          className={className}
          name={name}
          label={label}
          options={multiple ? newOptions : items}
          search
          disabled={disabled}
          onChange={handleOnChange}
          onSearchChange={handleOnSearch}
          fluid
          onFocus={onFocus}
          onBlur={handleOnBlur}
          onScroll={handleScroll}
          selectOnBlur={selectOnBlur}
          noResultsMessage={noResultsMessage}
          multiple={multiple}
          {...nextProps}
        />
        <label htmlFor={name} className="error-message">
          {stateError && errorMessage ? errorMessage : '\u00A0'}
        </label>
      </Form.Field>
    </div>
  );
};

CustomSelect.defaultProps = {
  name: 'customCombo',
  className: 'list-dropdown',
  selectOnBlur: true,
  defaultOpen: false,
  disabled: false,
  label: '',
  placeholder: '',
  stateError: false,
  errorMessage: '',
  onChange: () => { },
  getMoreItems: () => { },
  setStateError: () => { },
  onBlur: () => { },
  additionalItem: false,
  newItemConfig: {
    action: (
      <React.Fragment>
        <Icon name="plus" />
        {'Nuevo'}
      </React.Fragment>),
    placeholder: 'Nueva opción',
    subLabel: '*Nueva opción',
  },
  selection: true,
  onSearchChange: () => { },
};

CustomSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  })),
  className: PropTypes.string,
  selectOnBlur: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  stateError: PropTypes.bool,
  errorMessage: PropTypes.node,
  onChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  getMoreItems: PropTypes.func,
  setStateError: PropTypes.func,
  onBlur: PropTypes.func,
  additionalItem: PropTypes.bool,
  newItemConfig: PropTypes.shape({}),
  noResult: PropTypes.node,
  selection: PropTypes.bool,
  loading: PropTypes.bool,
};

export default CustomSelect;
