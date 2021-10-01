import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';

const PrivateRoute = (props) => {
  const { authenticated } = props;
  return true
    ? <Route {...props} />
    : <Redirect to={{ pathname: '/login' }} />;
};

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  location: ReactRouterPropTypes.location,
};

export default PrivateRoute;
