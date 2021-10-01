import React, { useEffect, Suspense } from 'react';
import { compose, bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { ToastProvider } from 'react-toast-notifications';
import { sessionService } from 'redux-react-session';

import { sessionActions } from './store/actions';
import Login from './layouts/Login';
import PrivateRoute from './components/PrivateRoute';
import ToastMessage from './components/ToastMessage';
import MainLayout from './layouts/MainLayout';
import ModalProvider from './components/ModalProvider';
import rootStore from './store/rootStore';
import loginReducer from './layouts/Login/reducer';
import './App.css';

function App({ authenticated, sessionActs }) {
  const history = useHistory();

  useEffect(() => {
    return () => {
      rootStore.injectReducer('login', loginReducer);
    }
  }, [authenticated]);

  const loadNewSession = async () => {
    if (authenticated) {
      await sessionService.loadSession().then(session => sessionActs.saveToken(session));
    }
  }

  useEffect(() => {
    loadNewSession();
  }, [authenticated])

  return (
    <React.Fragment>
      <ModalProvider />
      <Suspense fallback={<div>Loading ...</div>}>
        <ToastProvider placement="bottom-right">
          <ToastMessage />
          <Switch>
            {!authenticated && <Route path="/login" history={history}><Login /> </Route>}
            <PrivateRoute path="/" component={MainLayout} authenticated={authenticated} />
            <PrivateRoute component={MainLayout} authenticated={authenticated} />
          </Switch>
        </ToastProvider>
      </Suspense>
    </React.Fragment>
  );
}

App.propTypes = {
  authenticated: PropTypes.bool,
  sessionActs: PropTypes.shape({}),
};
const mapStateToProps = ({ session }) => ({
  authenticated: session.get('authenticated'),
});

const mapDispatchToProps = dispatch => ({
  sessionActs: bindActionCreators(sessionActions, dispatch),
});

const withCompose = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default withCompose(App);
