const ACTIONS = {
  ORDER_LIST: '@PRODUCT/ORDER_LIST',
  GET_ORDER: '@PRODUCT/GET_ORDER',
};

const setOrdertList = orders => ({
  type: ACTIONS.ORDER_LIST,
  payload: { orders },
});

const requestGetOrders = (id = 0) => ({
  type: ACTIONS.GET_ORDER,
  payload: { id },
})

export default {
  ...ACTIONS,
  setOrdertList,
  requestGetOrders,
};
