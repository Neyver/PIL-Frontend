/**
 * @param {object} events object with action to execute when an action is call
 * @returns {function(*=)} execute the action call
 */
export function createRestMiddleware(events = {}) {
  return store => next => (action) => {
    const event = events[action.type];
    if (event) {
      event(store, action);
    }
    return next(action);
  };
}

/**
 * @param {object} events object with action to execute when an action is call
 * @returns {function(*=)} execute the action call
 */
export function initMiddleware(events = {}) {
  return store => next => (action) => {
    const event = events[action.type];
    if (event) {
      event(store, action);
    }
    return next(action);
  };
}

/**
 * @param {object} events object with action to execute when an action is call
 * @returns {function} a function with event to executed
 */
export function createMiddleware(events = {}) {
  return store => next => (action) => {
    const event = events[action.type];
    if (event) {
      event(action, next, store.getState());
    }
    return next(action);
  };
}

/**
 * @param {object} initialState its a object with default estate for redux function
 * @param {object} events object with action to execute when an action is call
 * @returns {Function} reducer function
 */
export function createReducer(initialState = {}, events = {}) {
  return (state = initialState, action = {}) => {
    const event = events[action.type];
    if (event) {
      return event(state, action);
    }
    return state;
  };
}
