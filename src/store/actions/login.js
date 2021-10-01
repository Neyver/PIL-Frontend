const ACTIONS = {
  AUTHENTICATE: '@LOGIN/AUTHENTICATE',
  CLEAN_DATA: '@LOGIN/CLEAN',
  SET_ERROR: '@LOGIN/SET_ERROR',
};

const requestLogin = (username, password, ip, country) => ({
  type: ACTIONS.AUTHENTICATE,
  payload: { username, password, ip, country },
});

const cleanData = () => ({
  type: ACTIONS.CLEAN_DATA,
});

const setError = error => ({
  type: ACTIONS.SET_ERROR,
  payload: { error },
});

export default {
  ...ACTIONS,
  requestLogin,
  cleanData,
  setError,
};
