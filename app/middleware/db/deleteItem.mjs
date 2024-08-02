import * as utils from '../../middleware/utils/index.mjs'

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 * @param {Object} model - Mongoose model
 * @returns {Promise<Object>} - success object
 */
export const deleteItem = async (id = '', model = {}) => {
  try {
    const item = await model.findByIdAndDelete(id).exec()
    await utils.itemNotFound(null, item, 'NOT_FOUND')
    return utils.buildSuccObject('DELETED')
  } catch (error) {
    throw error
  }
}
