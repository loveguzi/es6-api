const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {string} id - item id
 * @param {Object} model - Mongoose model
 * @returns {Promise<Object>} - found item
 */
const getItem = async (id = '', model = {}) => {
  try {
    const item = await model.findById(id).exec()
    await itemNotFound(null, item, 'NOT_FOUND')
    return item
  } catch (error) {
    throw error
  }
}

module.exports = { getItem }
