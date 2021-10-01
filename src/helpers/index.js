export const defaultDiscardObject = {
  confirm: "Si",
  cancel: "No",
  message: "¿Desea cancelar la operación?",
  confirmHeader: "Los datos ingresados serán descartados",
  className: 'discard',
};

export const buildPath = (url, ...args) => {
  const newUrl = url.split('/');
  return newUrl.map((element) => {
    if (element.includes(':')) {
      return args.shift();
    }
    return element;
  }).join('/');
};

/*
 * Validate if a param is null or undefined throwing an error if that happens.
 */
export const requiredParam = (param) => {
  const requiredParamError = new Error(`[MT-WEB] - Required parameter, "${param}" is missing.`);
  // preserve original stack trace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(requiredParamError, requiredParam);
  }
  throw requiredParamError;
};

export function getQueryParams(query) {
  let newQuery = query;
  if (!newQuery.trim()) {
    return {};
  }

  if (newQuery.charAt(0) === '?') {
    newQuery = newQuery.substr(1);
  }

  return newQuery.split('&')
    .reduce((prev, current) => {
      const result = prev;
      const [key, value] = current.split('=');
      result[key] = window.decodeURIComponent(value);
      return result;
    }, {});
};

export function getNameBrowser() {
  var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
};

export const getOS = () => {
  let OpSys = '';
  if (navigator.userAgent.indexOf('IRIX') !== -1) {
    OpSys = 'Irix';
  } else if (
    navigator.userAgent.indexOf('Win') !== -1
    && navigator.userAgent.indexOf('4.90') !== -1
  ) {
    OpSys = 'Windows Millennium';
  } else if (
    navigator.userAgent.indexOf('Win') !== -1
    && navigator.userAgent.indexOf('98') !== -1
  ) {
    OpSys = 'Windows 98';
  } else if (
    navigator.userAgent.indexOf('Win') !== -1
    && navigator.userAgent.indexOf('95') !== -1
  ) {
    OpSys = 'Windows 95';
  } else if (navigator.userAgent.indexOf('Linux') !== -1) {
    OpSys = 'Linux';
  } else if (navigator.appVersion.indexOf('16') !== -1) {
    OpSys = 'Windows 3.1';
  } else if (navigator.appVersion.indexOf('NT') !== -1) {
    OpSys = 'Windows NT';
  } else if (navigator.appVersion.indexOf('SunOS') !== -1) {
    OpSys = 'SunOS';
  } else if (navigator.appVersion.indexOf('Linux') !== -1) {
    OpSys = 'Linux';
  } else if (navigator.userAgent.indexOf('Mac') !== -1) {
    OpSys = 'Macintosh';
  } else if (navigator.appName === 'WebTV Internet Terminal') {
    OpSys = 'WebTV';
  } else if (navigator.appVersion.indexOf('HP') !== -1) {
    OpSys = 'HP-UX';
  } else {
    OpSys = 'other';
  }
  return OpSys;
};
export default getQueryParams;
