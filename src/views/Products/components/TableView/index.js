import React, { useEffect, useState } from 'react';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import {
  Header, Icon, Dropdown, Grid, Segment, Image, Search,
} from 'semantic-ui-react';

import { productActions } from '../../../../store/actions';
import CustomTable from '../../../../components/CustomTable';
import { LABELS_PRODUCTS, DEFAULT_IMAGE_PRODUCT, LIST_KEYS } from '../../../../helpers/constants';
import EmptyMessage from '../../../../components/EmptyMessage'
import withDataOnDemand from '../../../../helpers/withDataOnDemand';
import { ProductsService } from '../../../../services';
import './style.scss';

const ProductsList = ({
  productActs,
  getMoreItems, items, requestOnDemand
}) => {

  useEffect(() => {
    productActs.requestPricesLists();
  }, []);

  const headerData = [
    {
      key: "id",
      name: "Numero",
      width: 1,
    },
    {
      name: 'Imagen',
      key: 'product_image',
      width: 1,
      component: state => {
        return <Image src={state ? state : DEFAULT_IMAGE_PRODUCT} size='mini' />
      },
    },
    {
      name: 'Nombre', key: 'product_name', width: 2,
    },
    {
      name: 'Stock',
      key: 'stock',
      width: 6,
    },
  ];

  return (
    <div className="product-table">
      <Header as="h2" >
        {LABELS_PRODUCTS.TITLE}
      </Header>
      <Header as="h4" attached='top'>
        <Icon name='tag' />
        {LABELS_PRODUCTS.SUB_TITLE}
      </Header>
      <Segment attached className='colection-dropdown'>
        <Search />
      </Segment>
      <CustomTable
        columns={headerData}
        data={fromJS(items)}
        emptyMessage={(<EmptyMessage title="Sólo un segundo" subtitle="Estamos buscando contenido para usted." nameIcon="circle notched" />)}
        heightTable="62vh"
        fixed
      />
    </div>
  )
}

ProductsList.propTypes = {
  priceList: PropTypes.arrayOf(PropTypes.shape({})),
  typeProductList: PropTypes.arrayOf(PropTypes.shape({})),
  brandList: PropTypes.arrayOf(PropTypes.shape({})),
  pricesList: PropTypes.arrayOf(PropTypes.shape({})),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  getMoreItems: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { product } = state;
  const priceList = product.getIn(['priceList', 'prices']) || [];
  const typeProductList = product.getIn(['typeProductList', 'products']) || [];
  const brandList = product.getIn(['brandsList', 'brands']) || [];
  const pricesList = product.getIn(['pricesList', 'prices_lists']) || [];
  return {
    priceList,
    typeProductList,
    brandList,
    pricesList,
  };
};

const mapDispatchToProps = dispatch => ({
  productActs: bindActionCreators(productActions, dispatch),
});

const withCompose = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default withDataOnDemand(
  {
    component: withCompose(ProductsList),
    listKey: LIST_KEYS.PRODUCTS.PRODUCTS,
    configEndPoint: {
      path: ProductsService.Endpoints.GET_ALL,
    },
    saveFirstPage: false,
  }
);
