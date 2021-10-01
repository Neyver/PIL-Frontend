const ACTIONS = {
  GET_ITEMS: '@DATA_ON_DEMAND/GET_ITEMS',
  SET_ITEMS: '@DATA_ON_DEMAND/SET_ITEMS',
  UPDATE_ITEMS: '@DATA_ON_DEMAND/UPDATE_ITEMS',
  SET_ITEM_BY_ID: '@DATA_ON_DEMAND/SET_ITEM_BY_ID',
  ADD_NEW_ITEM: '@DATA_ON_DEMAND/ADD_NEW_ITEM',
  REMOVE_ALL_ITEM: '@DATA_ON_DEMAND/REMOVE_ALL_ITEM',
  SET_ITEMS_FIRST_PAGE: '@DATA_ON_DEMAND/SET_ITEMS_FIRST_PAGE',
  SET_SEARCH_PARAM: '@DATA_ON_DEMAND/SET_SEARCH_PARAM',
  SET_LOADING: '@DATA_ON_DEMAND/SET_LOADING',
  SET_VALUE_SEARCH: '@DATA_ON_DEMAND/SET_VALUE_SEARCH',
  SET_VALUES_BY_ID: '@DATA_ON_DEMAND/SET_VALUES_BY_ID',
};

const setValuesById = (key, values, rest) => ({
  type: ACTIONS.SET_VALUES_BY_ID,
  payload: { key, values, rest, },
});

const setValueSearch = (key, value) => ({
  type: ACTIONS.SET_VALUE_SEARCH,
  payload: { key, value },
});

const setItemsFirstPage = (key, value) => ({
  type: ACTIONS.SET_ITEMS_FIRST_PAGE,
  payload: { key, value },
});

const setLoading = (key, value) => ({
  type: ACTIONS.SET_LOADING,
  payload: { key, value },
});

const getItems = ({
  urlService, query, listKey, withDebounce = false, saveFirstPage = true, paramsFilter,
}) => ({
  type: ACTIONS.GET_ITEMS,
  payload: {
    urlService, query, listKey, withDebounce, saveFirstPage, paramsFilter,
  },
});

const setItems = (key, value) => ({
  type: ACTIONS.SET_ITEMS,
  payload: { key, value },
});

const updateItems = (key, value) => ({
  type: ACTIONS.UPDATE_ITEMS,
  payload: { key, value },
});

const setItemById = (key, value, sortProp, idAttribute) => ({
  type: ACTIONS.SET_ITEM_BY_ID,
  payload: {
    key, value, sortProp, idAttribute,
  },
});

const addNewItem = (key, value) => ({
  type: ACTIONS.ADD_NEW_ITEM,
  payload: { key, value },
});

const removeAllItems = key => ({
  type: ACTIONS.REMOVE_ALL_ITEM,
  payload: { key },
});

const setSearchParam = (key, param) => ({
  type: ACTIONS.SET_SEARCH_PARAM,
  payload: { key, param },
});

export default {
  ...ACTIONS,
  getItems,
  setItems,
  updateItems,
  setItemById,
  addNewItem,
  setItemsFirstPage,
  removeAllItems,
  setSearchParam,
  setLoading,
  setValueSearch,
  setValuesById,
};
