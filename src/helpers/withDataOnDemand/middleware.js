
import { ServiceManager } from '../../services';
import { dataOnDemandActions as dataOnDemandActs } from '../../store/actions';

import { createMiddleware } from '../../store/reduxHelper';
import { DEBOUNCE_TIME } from '../../helpers/constants';
import { debounce } from 'lodash';

const innerGetItems = (action, dispatch, state) => {
  const {
    urlService, query, listKey, saveFirstPage, paramsFilter
  } = action.payload;
  debugger;
  const { dataOnDemand } = state;
  const valueSearch = dataOnDemand.getIn([listKey, 'valueSearch']) || '';

  dispatch(dataOnDemandActs.setLoading(listKey, true));
  ServiceManager.get(urlService, query)
    .then((respond) => {
      const { data } = respond.data;
      const value = {
        items: data[paramsFilter], currentPage: query['limit'],
      };
      if (query['limit'] === 25) {
        dispatch(dataOnDemandActs.setItems(listKey, value));
      } else {
        dispatch(dataOnDemandActs.updateItems(listKey, value));
      }
      if (query[query['limit']] === 25 && !valueSearch && saveFirstPage) {
        dispatch(dataOnDemandActs.setItemsFirstPage(listKey, data));
      }
      dispatch(dataOnDemandActs.setLoading(listKey, false));
    })
    .catch(() => {
      dispatch(dataOnDemandActs.setLoading(listKey, false));
      console.info(`[MT-WEB] - Error ocurred trying  to get data from the url: ${urlService}`);
    });
};

const debounceGetItems = debounce((action, dispatch, state) => innerGetItems(action, dispatch, state), DEBOUNCE_TIME);

const getItems = (action, dispatch, state) => {
  const { withDebounce = false } = action.payload;
  if (withDebounce) {
    debounceGetItems(action, dispatch, state);
  } else {
    innerGetItems(action, dispatch, state);
  }
};

const EVENTS = {
  [dataOnDemandActs.GET_ITEMS]: getItems,
};

const middleware = createMiddleware(EVENTS);

export default middleware;
