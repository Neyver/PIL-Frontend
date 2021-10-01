import ServiceManager from './ServiceManager';
import HelperService from '../../helpers';

const defaultEndpoints = {
  GET_BY_ID: '', GET_ALL: '', CREATE: '', UPDATE: '', DELETE: '',
};

class RestService {
  constructor(endpoints = defaultEndpoints) {
    this.Endpoints = endpoints;

    // TODO: `serviceInstance` should be used internally only
    //       and would be better if we don't expose it.
    this.serviceInstance = ServiceManager;
  }

  /**
   * Create a object
   * @param {string} object to create
   * @return {Promise} object created
   */
  create(object) {
    const dataObject = {
      data: {
        attributes: object,
      },
    };
    return ServiceManager.post(this.Endpoints.CREATE, dataObject);
  }

  /**
   * Update a specific Object
   * @param {string} id object id to update
   * @param {object} object object to update
   * @return {Promise} object updated
   */
  update(id, object) {
    const dataObject = {
      data: {
        attributes: object,
      },
    };
    const url = HelperService.formatPath(this.Endpoints.UPDATE, id);
    return ServiceManager.patch(url, dataObject);
  }

  /**
   * Delete a specific Object
   * @param {string} id object id to delete
   * @param {object} data object id to delete
   * @return {Promise} object deleted
   */
  delete(id, data = null) {
    const url = HelperService.formatPath(this.Endpoints.DELETE, id);
    return ServiceManager.delete(url, data);
  }

  /**
   * Get All Objects
   * @param {string} queryParams queryParams
   * @return {Promise} Deferred promise containing the resource with all data.
   */
  getAll(queryParams = null) {
    debugger;
    return ServiceManager.get(this.Endpoints.GET_ALL, queryParams);
  }

  /**
   * get object By ID
   * @param {string} id object id
   * @return {Promise} Deferred promise containing the resource with all data.
   */
  getById(id) {
    const url = HelperService.formatPath(this.Endpoints.GET_BY_ID, id);
    return ServiceManager.get(url);
  }
}

export default RestService;
