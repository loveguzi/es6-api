import * as utils from '../../middleware/utils/index.mjs'
import { listInitOptions } from './listInitOptions.mjs'
import { cleanPaginationID } from './cleanPaginationID.mjs'

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} model - Mongoose model
 * @param {Object} query - query object
 * @returns {Promise<Object>} - paginated items
 */
export const getItems = async (req = {}, model = {}, query = {}) => {
  try {
    const options = await listInitOptions(req)
    const items = await model.paginate(query, options)

    return cleanPaginationID(items)
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}
