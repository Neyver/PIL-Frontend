const ACTIONS = {
  PRODUCT_LIST: '@PRODUCT/PRODUCT_LIST',
  GET_PRODUCTS: '@PRODUCT/GET_PRODUCTS',
  PRICE_LIST: '@PRODUCT/PRICE_LIST',
  GET_PRICES: '@PRODUCT/GET_PRICES',
  GET_BRANDS: '@PRODUCT/GET_BRANDS',
  BRAND_LIST: '@PRODUCT/BRAND_LIST',
  GET_TYPE_PRODUCTS: '@PRODUCT/GET_TYPE_PRODUCTS',
  TYPE_PRODUCT_LIST: '@PRODUCT/TYPE_PRODUCT_LIST',
  CREATE_PRICES: '@PRODUCT/CREATE_PRICES',
  SET_PRICES_LISTS: '@PRODUCT/SET_PRICES_LISTS',
  GET_PRICES_LISTS: '@PRODUCT/GET_PRICES_LISTS',
  SET_PRODUCTS: '@PRODUCT/SET_PRODUCTS',
  CREATE_PRICES_LISTS: '@PRODUCT/CREATE_PRICES_LISTS',
  SET_LIST_OF_PRICES: '@PRODUCT/SET_LIST_OF_PRICES',
  CREATE_PRICE_BY_CHECK: '@PRODUCT/CREATE_PRICE_BY_CHECK',
  SET_NEW_CATEGORY: '@PRODUCT/SET_NEW_CATEGORY',
  GET_MARKS_BY_TYPE: '@PRODUCT/GET_MARKS_BY_TYPE',
  GET_ALL_IMAGES: '@PRODUCT/GET_ALL_IMAGES',
  POST_BY_PORCENTAJE: '@PRODUCT/POST_BY_PORCENTAJE',
};

const setProductList = products => ({
  type: ACTIONS.PRODUCT_LIST,
  payload: { products },
});

const requestGetProducts = (params = {}) => ({
  type: ACTIONS.GET_PRODUCTS,
  payload: { params },
});

const setPricesList = (list) => ({
  type: ACTIONS.SET_PRICES_LISTS,
  payload: { list },
});

const requestPricesLists = (params = {}) => ({
  type: ACTIONS.GET_PRICES_LISTS,
  payload: { params },
});

const setPriceList = prices => ({
  type: ACTIONS.PRICE_LIST,
  payload: { prices },
});

const requestTypePrices = (id = 0) => ({
  type: ACTIONS.GET_PRICES,
  payload: { id },
});

const setTypeProductList = products => ({
  type: ACTIONS.TYPE_PRODUCT_LIST,
  payload: { products },
});

const requestTypeProducts = (id = 0) => ({
  type: ACTIONS.GET_TYPE_PRODUCTS,
  payload: { id },
});

const setBrandList = brands => ({
  type: ACTIONS.BRAND_LIST,
  payload: { brands },
});

const requestBrands = (id = 0) => ({
  type: ACTIONS.GET_BRANDS,
  payload: { id },
});

const createPrices = (id, products, currentListPrice, percentage) => ({
  type: ACTIONS.CREATE_PRICES,
  payload: { id, products, currentListPrice, percentage },
});

const setProducts = (products) => ({
  type: ACTIONS.SET_PRODUCTS,
  payload: { products },
});

const requestSaveNewItem = (data) => ({
  type: ACTIONS.CREATE_PRICES_LISTS,
  payload: { data },
});

const setListOfPrices = (list) => ({
  type: ACTIONS.SET_LIST_OF_PRICES,
  payload: { list },
});

const createPriceByCheck = (id, products, currentListPrice, percentage) => ({
  type: ACTIONS.CREATE_PRICE_BY_CHECK,
  payload: { id, products, currentListPrice, percentage },
});

const setNewCategory = (newCategory) => ({
  type: ACTIONS.SET_NEW_CATEGORY,
  payload: { newCategory },
});

const requestMarksByType = (id) => ({
  type: ACTIONS.GET_MARKS_BY_TYPE,
  payload: { id },
});

const requestGetImages = (array) => ({
  type: ACTIONS.GET_ALL_IMAGES,
  payload: { array },
});

const requestPostByPorcentaje = (data) => ({
  type: ACTIONS.POST_BY_PORCENTAJE,
  payload: { data },
});

export default {
  ...ACTIONS,
  setProductList,
  requestGetProducts,
  requestTypePrices,
  setPriceList,
  setTypeProductList,
  requestTypeProducts,
  setBrandList,
  requestBrands,
  createPrices,
  setPricesList,
  requestPricesLists,
  setProducts,
  requestSaveNewItem,
  setListOfPrices,
  createPriceByCheck,
  setNewCategory,
  requestMarksByType,
  requestGetImages,
  requestPostByPorcentaje,
};
