import axios from 'axios/index';
import { sessionService } from 'redux-react-session';

import { config } from './config';

let instanceService = null;

/**
 * // TODO: Move this function inside RestService to be used internally only.
 * Service manager
 * @return {Object} service manager Object
 */
const ServiceManager = () => {
  if (instanceService) {
    return instanceService;
  }

  instanceService = axios.create(config);

  instanceService.defaults.paramsSerializer = params => (
    Object.entries(params).map((param) => {
      const key = param[0];
      let value = param[1];
      if (key.includes('contains-each')) {
        if (value) {
          value = value.trim().replace(/ /g, ',');
        }
      }
      return `${key}=${encodeURIComponent(value)}`;
    }).join('&')
  );

  instanceService.interceptors.response.use(response => response, (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      sessionService.deleteSession();
      sessionService.deleteUser();
    }
    return Promise.reject(error);
  });

  return {
    get: (url, queryParams) => instanceService({
      url,
      method: 'get',
      params: queryParams,
    }),

    post: (url, dataParams) => instanceService.post(url, dataParams),

    patch: (url, dataParams) => instanceService.patch(url, dataParams),

    put: (url, dataParams) => instanceService.put(url, dataParams),

    delete: (url, data) => instanceService.delete(url, data),

    setToken: (accessToken) => {
      instanceService.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
    },
  };
};

export default ServiceManager();
