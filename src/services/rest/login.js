import RestService from '../common/RestService';
import { getOS, getNameBrowser } from '../../helpers';

const Endpoints = {
  TC_LOGIN: '/users/login',
};

class LoginService extends RestService {
  constructor() {
    super(Endpoints);
  }

  /**
   * Login pa-service
   * @param {String} username username
   * @param {String} password password
   * @return {Promise} Deferred promise containing the user data.
   */
  loginPA = (username, password, ip, country) => {
    const OS = getOS();
    const browser = getNameBrowser();
    return this.serviceInstance.post(Endpoints.TC_LOGIN,
      {
        "user": {
          "username": username,
          "password": password
        },
        "client": {
          ip: ip,
          country: country,
          browser: browser,
          device: OS,
        },
      })
  }
}

export default new LoginService();
