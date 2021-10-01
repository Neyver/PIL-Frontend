import { LoginService } from '../../services';
import { loginActions, sessionActions } from '../../store/actions';

const requestLogin = (action, dispatch) => {
  const { username, password, ip, country } = action.payload;
  dispatch(loginActions.setError(''));

  LoginService.loginPA(username, password, ip, country)
    .then(({ data }) => {
      if (data.result) {
        dispatch(sessionActions.saveSession({ access_token: data.data.token, username: username }));
      } else {
        dispatch(loginActions.setError("El Usuario o la Contraseña es incorrecta"));
      }
    })
    .catch(() => {
      dispatch(loginActions.setError('LOGIN.ERROR'));
    });
};

const middleware = store => next => (action) => {
  const { type } = action;
  switch (type) {
    case loginActions.AUTHENTICATE:
      requestLogin(action, next, store);
      break;
    default:
      break;
  }
  next(action);
};

export const getUserIp = () => new Promise((resolve, reject) => {
  fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    .then((data) => resolve(data.ip))
    .catch((error) => {
      reject(error);
    });
});

export const getUserCountry = (ip) => new Promise((resolve, reject) => {
  fetch(`http://ip-api.com/json/${ip}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data.country);
    })
    .catch((error) => {
      reject(error);
    });
});

export default middleware;
