const { buildErrObject } = require('./buildErrObject')

/**
 * Item not found
 * @param {Object} err - error object
 * @param {Object} item - item result object
 * @param {string} message - message
 */
const itemNotFound = async (err = {}, item = {}, message = 'NOT_FOUND') => {
  if (err) {
    throw buildErrObject(422, err.message)
  }
  if (!item) {
    throw buildErrObject(404, message)
  }
}

module.exports = { itemNotFound }
