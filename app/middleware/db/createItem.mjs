import * as utils from '../../middleware/utils/index.mjs'

/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {Object} model - Mongoose model
 * @returns {Promise<Object>} - created item
 */
export const createItem = async (req = {}, model = {}) => {
  try {
    const item = await model.create(req)
    return item
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}
