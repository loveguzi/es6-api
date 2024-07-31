const { buildErrObject } = require('../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {Object} model - Mongoose model
 * @returns {Promise<Object>} - created item
 */
const createItem = async (req = {}, model = {}) => {
  try {
    const item = await model.create(req)
    return item
  } catch (err) {
    throw buildErrObject(422, err.message)
  }
}

module.exports = { createItem }
