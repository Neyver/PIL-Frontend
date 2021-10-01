import { addMiddleware } from 'redux-dynamic-middlewares';

import productReducer from '../views/Products/reducer';
import sessionReducer from '../helpers/session/reducer';
import dataOnDemandReducer from '../helpers/withDataOnDemand/reducer';
import loginReducer from '../layouts/Login/reducer';

import dataOnDemandMiddleware from '../helpers/withDataOnDemand/middleware';
import productMiddleware from '../views/Products/middleware';
import sessionMiddleware from '../helpers/session/middleware';

import initializeStore from './initializeStore';

const rootStore = initializeStore();

rootStore.injectReducer('product', productReducer);
rootStore.injectReducer('login', loginReducer);
rootStore.injectReducer('session', sessionReducer);
rootStore.injectReducer('dataOnDemand', dataOnDemandReducer);

addMiddleware(sessionMiddleware);
addMiddleware(productMiddleware);
addMiddleware(dataOnDemandMiddleware);

export default rootStore;
