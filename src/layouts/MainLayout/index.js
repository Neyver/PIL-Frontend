import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, } from 'react-router-dom';

import Header from '../../components/HeaderMenu';
import { sessionActions } from '../../store/actions';
import { PATHS_MAIN_MENU } from '../../helpers/constants';
import Products from '../../views/Products';
import NotFound from '../../views/NotFound';

const MainLayout = ({ username, sessionActs, history, authenticated }) => {

  useEffect(() => {
    if (true) {
      history.push(PATHS_MAIN_MENU.PRODUCTS);
    }
  }, [authenticated, history]);

  const logout = () => {
    sessionActs.cleanData();
    history.push('/login');
  };

  const mainOptions = [
    {
      label: "Products",
      routerPath: PATHS_MAIN_MENU.PRODUCTS,
    },
  ];

  return (
    <React.Fragment>
      <Header
        userOptions={[
          {
            icon: 'log out',
            onClick: logout,
            name: "Salir",
          },
        ]}
        userData={{ user: username, imageSrc: '' }}
        pageOptions={mainOptions}
      />
      <Switch>
        {MainLayout.Views.map(view => (
          (
            <Route key={view.path} path={view.path} >
              <view.Component />
            </Route>
          )
        ))}
      </Switch>
    </React.Fragment>
  );
};

MainLayout.propTypes = {
  history: PropTypes.shape({}),
  authenticated: PropTypes.bool,
};

MainLayout.Views = [
  { path: PATHS_MAIN_MENU.PRODUCTS, Component: Products },
  { path: "*", Component: NotFound },
];

const mapStateToProps = ({ session }) => {
  const username = session.getIn(['user', 'username']);
  const authenticated = session.get('authenticated');
  return { username, authenticated };
};

const mapDispatchToProps = dispatch => ({
  sessionActs: bindActionCreators(sessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
