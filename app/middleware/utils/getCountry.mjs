/**
 * Gets country from user using CloudFlare header 'cf-ipcountry'
 * @param {object} req - request object
 * @returns {string} country code or 'XX' if not found
 */
export const getCountry = ({ headers }) => headers['cf-ipcountry'] || 'XX'
