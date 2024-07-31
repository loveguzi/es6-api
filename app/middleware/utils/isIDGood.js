const mongoose = require('mongoose')
const { buildErrObject } = require('./buildErrObject')

/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
 * @returns {Promise<string>} - resolves with the id if valid, otherwise rejects with an error
 */
const isIDGood = async (id = '') => {
  const goodID = mongoose.Types.ObjectId.isValid(id)
  if (goodID) {
    return id
  } else {
    throw buildErrObject(422, 'ID_MALFORMED')
  }
}

module.exports = { isIDGood }
