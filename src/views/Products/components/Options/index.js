import React from 'react';
import { Header, Icon, Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { PATHS_MAIN_MENU } from '../../../../helpers/constants';
import './styles.scss'

const ListOption = () => {
  const history = useHistory();

  const handleAdminProducts = (path) => {
    history.push(path);
  };

  const getActivePath = (value) => {
    const path = new RegExp(value);
    return path.test(history.location.pathname);
  };

  return (
    <div className="list-option">
      <Header as="h2">
        {"Administrador"}
      </Header>
      <Menu secondary vertical size="massive">
        <Menu.Item
          className="item-options"
          name="Productos"
          active={getActivePath(PATHS_MAIN_MENU.PRODUCTS)}
          onClick={() => handleAdminProducts(PATHS_MAIN_MENU.PRODUCTS)}
        >
          <Icon className="product hunt" />
          <span>{"Productos"}</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};
ListOption.propTypes = {
};

const mapStateToProps = () => {
};

const withCompose = compose(
  connect(mapStateToProps)
);

export default withCompose(ListOption);