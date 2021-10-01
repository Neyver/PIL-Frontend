const ACTIONS = {
  SAVE_SESSION: '@SESSION/SAVE_SESSION',
  SAVE_TOKEN: '@SESSION/SAVE_TOKEN',
  LOGOUT: '@SESSION/LOGOUT',
  CLEAN_DATA: '@SESSION/CLEAN_DATA',
};

const saveSession = session => ({
  type: ACTIONS.SAVE_SESSION,
  payload: { session },
});

const saveToken = token => ({
  type: ACTIONS.SAVE_TOKEN,
  payload: { token },
});

const logout = () => ({
  type: ACTIONS.LOGOUT,
  payload: {},
});

const cleanData = () => ({
  type: ACTIONS.CLEAN_DATA,
});

export default {
  ...ACTIONS,
  saveSession,
  saveToken,
  logout,
  cleanData,
};
