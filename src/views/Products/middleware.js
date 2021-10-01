import { ProductsService } from '../../services';
import { createMiddleware } from '../../store/reduxHelper';
import { productActions, dataOnDemandActions } from '../../store/actions';
import { ModalManager } from '../../components/ModalProvider';
import { MessagesManager } from '../../components/ToastMessage';

const requestGetProducts = (action, dispatch) => {
  const { params } = action.payload;
  ProductsService.getAll(params)
    .then(({ data }) => {
      if (data && data.data) {
        const products = data.data.products;
        dispatch(productActions.setProductList({ products }));
      }
    });
};

const requestTypePrices = (action, dispatch) => {
  ProductsService.getAllTypePrice()
    .then((res) => {
      const prices = res.data.data.categories;
      dispatch(productActions.setPriceList({ prices }));
    });
};

const requestTypeProducts = (action, dispatch) => {
  ProductsService.getTypeProduct()
    .then((res) => {
      const products = res.data.data.categories;
      dispatch(productActions.setTypeProductList({ products }));
    });
};

const requestBrands = (action, dispatch) => {
  ProductsService.getBrands()
    .then((res) => {
      const brands = res.data.data.categories;
      dispatch(productActions.setBrandList({ brands }));
    });
};

const requestMarksByType = (action, dispatch) => {
  const { id } = action.payload;
  ProductsService.getMarksByTypeCategory(id)
    .then((res) => {
      const brands = res.data.data.marks_categories;
      dispatch(productActions.setBrandList({ brands }));
    });
};

const requestPricesLists = (action, dispatch) => {
  ProductsService.getPriceList()
    .then((res) => {
      const list = res.data.data;
      dispatch(productActions.setPricesList({ list }));
    });
};

const createPrices = (action, dispatch) => {
  const { id, products, currentListPrice, percentage = 0 } = action.payload;

  const listProduct = products.map((product) => {
    return {
      "purchase_price_id": null,
      "product_id": product.id,
      "category_id": id,
      "price_list_id": currentListPrice.toString(),
      "percentage_of_purchase_price": percentage.toString(),
      'original_price': product.original_price,
    }
  });
  ProductsService.postPrices(listProduct)
    .then(({ data }) => {
      ModalManager.closeModal('KEYS_MODALS.MAINTENANCE');
      MessagesManager.success('Se proceso correctamente');
      if (data && data.data['sales_prices']) {
        (data.data['sales_prices']).map((price, index) => {
          const newPrice = { ...price, 'price': price['original_price'], id: price["product_id"] };
          dispatch(dataOnDemandActions.setItemById('products', newPrice));
        }
        );
      }
    }).catch(() => {
      ModalManager.closeModal('KEYS_MODALS.MAINTENANCE');
      MessagesManager.error('No se pudo procesar correctamente');
    });;
};
const createPriceByCheck = (action, dispatch) => {
  const { id, products, currentListPrice, percentage = 0 } = action.payload;
  const newCategory = {
    "product_id": products[0].id,
    "sale_price_category_id": id,
    "price_list_id": currentListPrice.toString(),
    "percentage_of_purchase_price": percentage.toString(),
    'original_price': products[0].original_price,
    id: products[0].id,
  };
  ProductsService.postPriceListByCheck(products[0].id, id)
    .then(({ data }) => {
      dispatch(dataOnDemandActions.setItemById('products', newCategory));
      MessagesManager.success('Se proceso correctamente');
      ModalManager.closeModal('KEYS_MODALS.MAINTENANCE');
    }).catch(() => {
      MessagesManager.error('No se pudo procesar correctamente');
      ModalManager.closeModal('KEYS_MODALS.MAINTENANCE');
    });;
};

const requestSaveNewItem = (action, dispatch) => {
  const { data } = action.payload;
  if (data && !data.bubbles) {
    ProductsService.postNewList({ name: data })
      .then(({ data }) => {
        MessagesManager.success('Se proceso correctamente');
        dispatch(productActions.setListOfPrices(data.data['price_list']));
      }).catch(() => {
        MessagesManager.error('No se pudo procesar correctamente');
      });;
  }
};

const requestGetImages = (action, dispatch) => {
  const { array } = action.payload;
  const params = {
    products_ids: array,
    width: 100,
    height: 100
  };

  ProductsService.getAllImages(params)
    .then(({ data }) => {
      if (data && data.data) {
        const result = data.data.images;
        result.map(res => {
          const newImage = {
            image: res.image && res.image.length && res.image[0] ? res.image[0] : '',
            id: res.product_id,
          };
          dispatch(dataOnDemandActions.setItemById('products', newImage));
        });
      }
    })
};

const requestPostByPorcentaje = (action, dispatch) => {
  const { data } = action.payload;
  const { id, currentBrand, currentProduct, currentListPrice, percentage, products } = data;
  let array = [];
  if (currentBrand) {
    array.push(currentBrand);
  }
  if (currentProduct) {
    array.push(currentProduct);
  }
  const obj = {
    price_list_id: currentListPrice,
    price_category_id: id,
    price_percentage: percentage,
    other_categories_ids: array.length ? array.toString() : null,
  }
  ModalManager.closeModal('KEYS_MODALS.MAINTENANCE');
  dispatch(dataOnDemandActions.setValuesById('products', products, { percentage_of_purchase_price: percentage }));
  ProductsService.postByPorcentaje(obj)
    .then(({ data }) => {
      MessagesManager.success('Se proceso correctamente');
    }).catch(() => {
      ModalManager.closeModal('KEYS_MODALS.MAINTENANCE');
      MessagesManager.error('No se pudo procesar correctamente');
    });;
};

const EVENTS = {
  [productActions.GET_PRODUCTS]: requestGetProducts,
  [productActions.GET_PRICES]: requestTypePrices,
  [productActions.GET_TYPE_PRODUCTS]: requestTypeProducts,
  [productActions.GET_BRANDS]: requestBrands,
  [productActions.CREATE_PRICES]: createPrices,
  [productActions.GET_PRICES_LISTS]: requestPricesLists,
  [productActions.CREATE_PRICES_LISTS]: requestSaveNewItem,
  [productActions.CREATE_PRICE_BY_CHECK]: createPriceByCheck,
  [productActions.GET_MARKS_BY_TYPE]: requestMarksByType,
  [productActions.GET_ALL_IMAGES]: requestGetImages,
  [productActions.POST_BY_PORCENTAJE]: requestPostByPorcentaje,
};

const middleware = createMiddleware(EVENTS);

export default middleware;
