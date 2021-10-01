import React from 'react';

import ContainerView from '../../components/ContainerView';
import { PANEL_COLORS } from '../../helpers/constants';
import TableList from './../Products/components/TableView';
import Options from './components/Options';

const Products = ({ history }) => {
  return (
    <ContainerView
      leftPanel={{
        color: PANEL_COLORS.LEFT,
        component: <Options />,
      }}
      centerPanel={{
        component: <TableList />,
        color: PANEL_COLORS.CENTER,
      }}
    />
  )
}
export default Products;