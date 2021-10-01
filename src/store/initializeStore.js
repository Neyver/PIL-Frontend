import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import dynamicMiddlewares from 'redux-dynamic-middlewares';

/*
 * @param {Object} - key/value of reducer functions
 */
const _createReducer = asyncReducers => combineReducers({
  ...asyncReducers,
});

const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const initializeStore = () => {
  // createStore returns a plain object so we'll mess with it after creation.
  const store = createStore(
    // See rootReducer.createReducer for more info on this. Calling it without
    // a param creates a reducer with whatever is in rootReducer.
    _createReducer(),
    // NOTE: Don't put this in a prod build, just doing this for the demo.
    composeEnhancers(applyMiddleware(dynamicMiddlewares))
  );

  // Create an object for any later reducers
  store.asyncReducers = {};

  // Creates a convenient method for adding reducers later
  // See withReducer.js for this in use.
  store.injectReducer = (key, reducer) => {
    // Updates the asyncReducers object. This ensures we don't remove any old
    // reducers when adding new ones.
    store.asyncReducers[key] = reducer;
    // This is the key part: replaceReducer updates the reducer
    // See rootReducer.createReducer for more details, but it returns a function.
    store.replaceReducer(_createReducer(store.asyncReducers));
    return store;
  };

  return store;
};

export default initializeStore;
