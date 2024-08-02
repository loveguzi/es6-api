import * as utils from '../../middleware/utils/index.mjs'
import * as helpers from './helpers/index.mjs'

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllCities = async (req, res) => {
  try {
    res.status(200).json(await helpers.getAllItemsFromDB())
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { getAllCities }
