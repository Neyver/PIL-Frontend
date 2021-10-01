import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { dataOnDemandActions as dataOnDemandActs } from '../../store/actions';
import { requiredParam, buildPath } from '../../helpers';

/**
 * HOC that helps to use a server through the passed apiPath that retrieve some data and
 * save it directly in the redux store
 *
 * @example
 * const DropDownOnDemand = (props) => {
 * const { onSearch, getMoreItems, items } = props;
 * const newOptions = items.map(item => ({ id: item.id, text: item.attributes['name'], value: item.id }));
 *   return (
 *     <CustomSelect
 *     options={newOptions}
 *     getMoreItems={getMoreItems}
 *     onSearchChange={val => onSearch({ 'filter[first-name][contains-each]': val })} />
 *   );
 * };
 * export default withDataOnDemand(
 *     DropDownOnDemand,
 *     apiPath: 'urlService',
 *     listKey: 'key to save list in the store',
 *     queryParams: {...}
 *   );
 *  Using withDataOnDemand with configEndPoint
 * export default withDataOnDemand(
 *   {
 *     component: DropDownOnDemand,
 *     listKey: 'key to save list in the store',
 *     configEndPoint: {
 *          path: 'urlService',
 *          defaultParams: {...},
 *          filterProperties: 'name,last-name', // fields name to search
 *     },
 *     initializeData: true, // The request is executed in the constructor of the withDataOnDemand
 *     // initializeData: false, // Request controlled, make use of requestOnDemand function
 *     saveFirstPage: false, // Save a copy of fisrt page without filter
 *   }
 * )
 *
 * @param { React.Component } WrappedComponent - A component to enhance.
 * @param { String } listKey - The identifier for the list.
 * @param { Function } apiPath - A path to the resource
 * @param { Object } queryParams - An object that contains a query.
 * @param { Boolean } withPersistenceData - Maintain data when unmount the component
 * @returns { React.Component } An enhanced component that does a request and its connected to the store.
 */
const withDataOnDemand = ({
  component: WrappedComponent = requiredParam('component'),
  listKey = requiredParam('listKey'),
  withPersistenceData = true,
  saveFirstPage = true,
  configEndPoint = undefined,
  initializeData = false,
  paramsFilter,
}) => {
  const NewWrappedComponent = (props) => {
    const {
      getItems, currentPage, setSearchParam, setValueSearch, totalPages, removeAllItems, ...passThroughProps
    } = props;

    const [query, setQuery] = useState(configEndPoint.defaultParams);
    const { current } = useRef({ path: configEndPoint.path });

    useEffect(() => (
      () => {
        if (!withPersistenceData) {
          removeAllItems(listKey);
        }
      }
    ), []);

    const updateApiPath = (idsEndPoint) => {
      current.path = buildPath(configEndPoint.path, ...idsEndPoint);
    };

    const nextPage = () => {
      const limitPages = 1250 - 1;
      if (currentPage < limitPages) {
        const params = {
          ...query,
        };
        getItems({ urlService: current.path, query: params, listKey, paramsFilter, });
      }
    };

    const onSearchOnDemand = (value = '', withDebounce = true) => {
      const params = {
        ...query,
      };
      if (configEndPoint.customFilter) {
        params[configEndPoint.customFilter] = value;
      } else {
        params[`filter[${configEndPoint.filterProperties}][contains-each]`] = value;
      }
      setValueSearch(listKey, value);
      setQuery({ ...params });
      getItems({
        urlService: current.path, query: params, listKey, withDebounce,
      });
    };

    const requestOnDemand = (newParams) => {
      const params = {
        ...query,
        ...newParams,
      };
      setQuery({ ...query, ...newParams });
      getItems({
        urlService: current.path,
        query: params,
        listKey,
        saveFirstPage: saveFirstPage,
        paramsFilter,
      });
    };

    useEffect(() => {
      if (initializeData) {
        const params = {
          ...configEndPoint.defaultParams,
        };
        setQuery(configEndPoint.defaultParams);
        getItems({ urlService: current.path, query: params, listKey, paramsFilter });
      }
      if (configEndPoint.filterProperties) {
        setSearchParam(listKey, configEndPoint.filterProperties);
      }
    }, []);

    return (
      <WrappedComponent
        getMoreItems={nextPage}
        requestOnDemand={requestOnDemand}
        onSearchOnDemand={onSearchOnDemand}
        updateApiPath={updateApiPath}
        {...passThroughProps}
      />
    );
  };

  const mapStateToProps = ({ dataOnDemand }) => {
    const items = dataOnDemand.getIn([listKey, 'items']) || [];
    const itemsWF = dataOnDemand.getIn([listKey, 'itemsWF']) || [];
    const currentPage = dataOnDemand.getIn([listKey, 'currentPage']) || 0;
    const totalPages = dataOnDemand.getIn([listKey, 'totalPages']) || 1;
    const loading = dataOnDemand.getIn([listKey, 'loading']) || false;
    return {
      items, itemsWF, currentPage, totalPages, loading,
    };
  };

  const mapDispatchToProps = dispatch => ({
    getItems: data => dispatch(
      dataOnDemandActs.getItems(data)
    ),
    removeAllItems: key => dispatch(dataOnDemandActs.removeAllItems(key)),
    setSearchParam: (key, searchParam) => dispatch(dataOnDemandActs.setSearchParam(key, searchParam)),
    setValueSearch: (key, value) => dispatch(dataOnDemandActs.setValueSearch(key, value)),
  });

  const withCompose = compose(
    connect(mapStateToProps, mapDispatchToProps)
  );

  NewWrappedComponent.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    getItems: PropTypes.func,
    removeAllItems: PropTypes.func,
    setSearchParam: PropTypes.func,
    setValueSearch: PropTypes.func,
  };

  return withCompose(NewWrappedComponent);
};

export default withDataOnDemand;
