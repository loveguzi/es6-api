/**
 * Builds error object
 * @param {number|string} code - error code
 * @param {string} message - error text
 * @returns {Object} error object
 */
const buildErrObject = (code = '', message = '') => ({ code, message })

export { buildErrObject }
