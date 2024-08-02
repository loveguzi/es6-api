import * as utils from '../../middleware/utils/index.mjs'

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} model - Mongoose model
 * @param {Object} req - request object
 * @returns {Promise<Object>} - updated item
 */
export const updateItem = async (id = '', model = {}, req = {}) => {
  try {
    const item = await model
      .findByIdAndUpdate(id, req, {
        new: true,
        runValidators: true
      })
      .exec()
    await utils.itemNotFound(null, item, 'NOT_FOUND')
    return item
  } catch (error) {
    throw error
  }
}
