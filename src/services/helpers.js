/**
 * Format String url and replace params in Url
 * @param {string} url String Url Valid
 * @param {args} args values
 * @returns {string} url Valid
 */
export const formatPath = (url, ...args) => {
  const cad = url.split('/');
  return cad.map((element) => {
    if (element.includes(':')) {
      return encodeURIComponent(args.shift());
    }
    return element;
  }).join('/');
};
