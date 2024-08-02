import City from '../../models/city.mjs'
import * as db from '../../middleware/db/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCities = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    const cities = await db.getItems(req, City, query)

    res.status(200).json(cities)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { getCities }
