import { sessionReducer } from 'redux-react-session/immutable';
import { sessionService } from 'redux-react-session';
import { fromJS } from 'immutable';
import { sessionActions } from '../../store/actions';
import ServiceManager from '../../services/common/ServiceManager';

const initialState = fromJS({
  user: {},
  checked: true,
  authenticated: false,
  invalid: true,
  token: '',
});


const saveToken = (state, action) => {
  const { token } = action.payload;
  ServiceManager.setToken(token);
  return state.set('token', token);
};

const saveSession = (state, action) => {
  const { session } = action.payload;
  sessionService.saveSession(session.access_token);
  ServiceManager.setToken(session.access_token);
  const userToSave = {
    username: session.username,
    token: session.access_token,
  };
  sessionService.saveUser(userToSave);
  return state.set('token', session.access_token);
};

const cleanData = () => {
  sessionService.deleteSession();
  sessionService.deleteUser();
  return initialState;
}

function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case sessionActions.SET_PERMISSION:
    case sessionActions.SAVE_SESSION:
      return saveSession(state, action);
    case sessionActions.SAVE_TOKEN:
      return saveToken(state, action);
    case sessionActions.CLEAN_DATA:
      return cleanData(state, action);
    case sessionActions.SET_BUILDING_ID:
    default:
      return state.merge(sessionReducer(state, action));
  }
}

export default reducer;
