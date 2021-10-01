import { fromJS } from 'immutable';

import { createReducer } from '../../store/reduxHelper';
import { productActions } from '../../store/actions';

const initialState = fromJS({
  productList: {},
  priceList: {},
  typeProductList: {},
  brandsList: {},
  pricesList: {},
  productsComplete: [],
});

const setProductList = (state, action) => {
  const { products } = action.payload;
  const newState = state.set('productList', products);
  return newState;
};

const setPriceList = (state, action) => {
  const { prices } = action.payload;
  const newState = state.set('priceList', prices);
  return newState;
};

const setTypeProductList = (state, action) => {
  const { products } = action.payload;
  const newState = state.set('typeProductList', products);
  return newState;
};

const setBrandList = (state, action) => {
  const { brands } = action.payload;
  const newState = state.set('brandsList', brands);
  return newState;
};

const setPricesList = (state, action) => {
  const { list } = action.payload;
  const newState = state.set('pricesList', list.list);
  return newState;
};

const setProducts = (state, action) => {
  const { products } = action.payload;
  const newProducts = state.getIn(['productList', 'products']) || [];
  const aaaa = newProducts.map((product, index) => {
    if ((products.products)[index]) {
      const aux = (products.products)[index];
      if (product.id === aux['product_id']) {
        product["category_id"] = aux["category_id"];
        product["sale_price"] = aux["sale_price"];
        product["percentage_of_purchase_price"] = aux["percentage_of_purchase_price"];
      }
    }
    return product;
  });
  const newState = state.set('productList', { products: aaaa });
  return newState;
};

const setListOfPrices = (state, action) => {
  const { list } = action.payload;
  const lists = state.getIn(['pricesList', 'prices_lists']) || [];
  lists.push(list);
  const newState = state.set('pricesList', { prices_lists: lists });
  return newState;
};

const setNewCategory = (state, action) => {
  const { newCategory } = action.payload;
  const newProducts = state.getIn(['productList', 'products']) || [];
  const aaaa = newProducts.map((product, index) => {
    if (product.id === newCategory['product_id']) {
      product["category_id"] = newCategory["category_id"];
      product["sale_price"] = newCategory["sale_price"];
      product["percentage_of_purchase_price"] = newCategory["percentage_of_purchase_price"];
    }
    return product;
  });
  const newState = state.set('productList', { products: aaaa });
  return newState;
};

const EVENTS = {
  [productActions.PRODUCT_LIST]: setProductList,
  [productActions.PRICE_LIST]: setPriceList,
  [productActions.TYPE_PRODUCT_LIST]: setTypeProductList,
  [productActions.BRAND_LIST]: setBrandList,
  [productActions.SET_PRICES_LISTS]: setPricesList,
  [productActions.SET_PRODUCTS]: setProducts,
  [productActions.SET_LIST_OF_PRICES]: setListOfPrices,
  [productActions.SET_NEW_CATEGORY]: setNewCategory,
};

/*
 * @reduxReducer
 */
const reducer = createReducer(initialState, EVENTS);

export default reducer;
