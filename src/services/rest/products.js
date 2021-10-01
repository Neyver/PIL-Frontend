import RestService from '../common/RestService';
import { formatPath } from '../helpers';

class ProductService extends RestService {
  static Endpoints = {
    GET_ALL: '/product',
    GET_BRANDS: '/categories/?sqlfilters=fk_parent=10',
    GET_PRODUCTS: '/categories/?sqlfilters=fk_parent=11',
    GET_TYPE_PRICES: '/categories/?sqlfilters=fk_parent=2596',
    CREATE_PRICES: '/prices/sales-prices/',
    SALES_PRICES_BY_ID: 'prices/sales-prices/:id',
    PRICE_LIST: '/prices/prices-lists',
    PATCH_BY_ID: '/prices/change_price_category/:productId/:id',
    MARKS_BY_TYPE_CATEGORY: '/categories/marks-categories-by-type-category/:id',
    GET_ALL_IMAGES: '/documents/main-products-images/',
    POST_CHANGE_BY_PORCENTAJE: '/prices/change-percentage-to-price-category/',
  };

  constructor() {
    super(ProductService.Endpoints);
  };

  getTypeProduct = () => {
    return this.serviceInstance.get(ProductService.Endpoints.GET_PRODUCTS);
  };

  getBrands = () => {
    return this.serviceInstance.get(ProductService.Endpoints.GET_BRANDS);
  };

  getMarksByTypeCategory = (id) => {
    const url = formatPath(ProductService.Endpoints.MARKS_BY_TYPE_CATEGORY, id);
    return this.serviceInstance.get(url);
  };

  getAllTypePrice = () => {
    return this.serviceInstance.get(ProductService.Endpoints.GET_TYPE_PRICES);
  };

  postPrices = (data) => {
    const aux = {
      "sales_prices": data,
    }
    return this.serviceInstance.post(ProductService.Endpoints.CREATE_PRICES, aux);
  };

  getPriceList = () => {
    return this.serviceInstance.get(ProductService.Endpoints.GET_ALL);
  };

  postPriceList = (data) => {
    return this.serviceInstance.post(ProductService.Endpoints.PRICE_LIST, data);
  };

  postPriceListByCheck = (productId, id) => {
    const url = formatPath(ProductService.Endpoints.PATCH_BY_ID, productId, id);
    return this.serviceInstance.get(url);
  };

  postNewList = (data) => {
    const aux = {
      "price_list": data,
    }
    return this.serviceInstance.post(ProductService.Endpoints.PRICE_LIST, aux);
  };

  getAllImages = (params) => {
    return this.serviceInstance.get(ProductService.Endpoints.GET_ALL_IMAGES, params);
  };

  postByPorcentaje = (data) => {
    return this.serviceInstance.post(ProductService.Endpoints.POST_CHANGE_BY_PORCENTAJE, data);
  };
}

export default new ProductService();