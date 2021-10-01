import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import { sessionService } from 'redux-react-session';
import { addMiddleware } from 'redux-dynamic-middlewares';
import { createBrowserHistory } from "history";

import App from './App';
import reportWebVitals from './reportWebVitals';
import rootStore from './store/rootStore';
import loginMiddleware from './layouts/Login/middleware';
import './index.scss';

const history = createBrowserHistory();
const options = {
  refreshOnCheckAuth: true,
  driver: 'LOCALSTORAGE',
};
addMiddleware(loginMiddleware);

sessionService.initSessionService(rootStore, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

ReactDOM.render(
  <Router basename="/erp-admin" history={history}>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </Router >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
