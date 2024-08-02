import * as utils from '../../middleware/utils/index.mjs'

/**
 * Gets item from database by id
 * @param {string} id - item id
 * @param {Object} model - Mongoose model
 * @returns {Promise<Object>} - found item
 */
export const getItem = async (id = '', model = {}) => {
  try {
    const item = await model.findById(id).exec()
    await utils.itemNotFound(null, item, 'NOT_FOUND')
    return item
  } catch (error) {
    throw error
  }
}
