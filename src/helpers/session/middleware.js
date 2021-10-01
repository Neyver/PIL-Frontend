import { sessionActions } from '../../store/actions';

const logout = (action, dispatch) => {
  dispatch(sessionActions.cleanData());
};

const middleware = store => next => (action) => {
  const { type } = action;
  switch (type) {
    case sessionActions.LOGOUT:
      logout(action, next, store);
      break;
    default:
      break;
  }
  next(action);
};

export default middleware;
