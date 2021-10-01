import { fromJS } from 'immutable';
import { createReducer } from '../../store/reduxHelper';
import { loginActions } from '../../store/actions';

const initialState = fromJS({
  error: null,
});

const setError = (state, action) => {
  const { error } = action.payload;
  return state.set('error', error);
};

const cleanData = () => initialState;

const EVENTS = {
  [loginActions.SET_ERROR]: setError,
  [loginActions.CLEAN_DATA]: cleanData,
};

/*
 * @reduxReducer
 */
const reducer = createReducer(initialState, EVENTS);

export default reducer;
