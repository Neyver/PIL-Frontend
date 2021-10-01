import RestService from '../common/RestService';

class OrderService extends RestService {
  static Endpoints = {
    GET_ALL: '/orders/',
  };

  constructor() {
    super(OrderService.Endpoints);
  }
}

export default new OrderService();