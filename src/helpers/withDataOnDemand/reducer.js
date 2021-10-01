import { fromJS } from 'immutable';
import { uniqBy } from 'lodash';

import { createReducer } from '../../store/reduxHelper';
import { dataOnDemandActions as dataOnDemandActs } from '../../store/actions';

const initialState = fromJS({
});

const setItems = (state, action) => {
  const { key, value } = action.payload;
  let oldData = state.get(key);
  if (oldData.size) {
    oldData = oldData.toJS();
  }
  const newData = state.set(key, { ...oldData, ...value });
  return newData;
};

const removeAllItems = (state, action) => {
  const { key } = action.payload;
  const newData = state.set(key, {});
  return newData;
};

const updateItems = (state, action) => {
  const { key, value = [] } = action.payload;
  const currentItems = state.getIn([key, 'items']) || [];
  const newItems = currentItems.concat(value.items) || [];
  const newData = newItems[0] || {};
  const isNonfilterableData = newData.type === 'history';
  const filteredData = isNonfilterableData ? newItems : uniqBy(newItems, 'id');
  let newState = state.setIn([key, 'items'], filteredData);
  newState = newState.setIn([key, 'currentPage'], value.currentPage);
  newState = newState.setIn([key, 'totalCount'], value.totalCount);
  return newState;
};

const setItemById = (state, action) => {
  const {
    key, value,
  } = action.payload;
  const items = state.getIn([key, 'items']) || [];
  let index = items.findIndex(item => item.id === value.id);
  let newState = state;

  const aux = { ...items[index], ...value }
  const path = [key, 'items', index];
  if (index >= 0) {
    newState = state.setIn(path, aux);
  }
  return newState;
};

const addNewItem = (state, action) => {
  let newState = state;
  const { key, value } = action.payload;
  const totalCount = state.getIn([key, 'totalCount']) || 0;
  const items = state.getIn([key, 'items']) || [];
  items.unshift(value);
  const newData = [...items];
  newState = state.setIn([key, 'items'], newData);
  newState = newState.setIn([key, 'totalCount'], totalCount + 1);
  return newState;
};

const setItemsFirstPage = (state, action) => {
  const { key, value } = action.payload;
  // TODO - itemsWF = only the first page (rename the property name)
  return state.setIn([key, 'itemsWF'], value);
};

const setSearchParam = (state, action) => {
  const { key, param } = action.payload;
  return state.setIn([key, 'searchParam'], param);
};

const setLoading = (state, action) => {
  const { key, value } = action.payload;
  return state.setIn([key, 'loading'], value);
};

const setValueSearch = (state, action) => {
  const { key, value } = action.payload;
  return state.setIn([key, 'valueSearch'], value);
};

const setValuesById = (state, action) => {
  const {
    key, values, rest,
  } = action.payload;
  const items = state.getIn([key, 'items']) || [];
  let count = 0;
  const newItems = items.map(item => {
    let index = values.findIndex(value => item.id === value.id);
    if (index >= 0 && values.length >= count) {
      count++;
      return { ...item, ...rest }
    }
    return item;
  });
  return state.setIn([key, 'items'], newItems);
};

const EVENTS = {
  [dataOnDemandActs.SET_ITEMS]: setItems,
  [dataOnDemandActs.UPDATE_ITEMS]: updateItems,
  [dataOnDemandActs.SET_ITEM_BY_ID]: setItemById,
  [dataOnDemandActs.ADD_NEW_ITEM]: addNewItem,
  [dataOnDemandActs.REMOVE_ALL_ITEM]: removeAllItems,
  [dataOnDemandActs.SET_ITEMS_FIRST_PAGE]: setItemsFirstPage,
  [dataOnDemandActs.SET_SEARCH_PARAM]: setSearchParam,
  [dataOnDemandActs.SET_LOADING]: setLoading,
  [dataOnDemandActs.SET_VALUE_SEARCH]: setValueSearch,
  [dataOnDemandActs.SET_VALUES_BY_ID]: setValuesById,
};

/*
 * @reduxReducer
 */
const reducer = createReducer(initialState, EVENTS);

export default reducer;
