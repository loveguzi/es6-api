import * as utils from '../../middleware/utils/index.mjs'
import { buildSort } from './buildSort.mjs'

/**
 * Builds initial options for query
 * @param {Object} req - request object
 * @returns {Object} options - query options
 */
export const listInitOptions = (req = {}) => {
  try {
    const order = parseInt(req.query.order, 10) || -1
    const sort = req.query.sort || 'createdAt'
    const sortBy = buildSort(sort, order)
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 5

    return {
      sort: sortBy,
      lean: true,
      page,
      limit
    }
  } catch (error) {
    console.error(error.message)
    throw utils.buildErrObject(422, 'ERROR_WITH_INIT_OPTIONS')
  }
}
