import City from '../../models/city.mjs'
import * as db from '../../middleware/db/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'
import { matchedData } from 'express-validator'
import * as helpers from './helpers/index.mjs'

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createCity = async (req, res) => {
  try {
    req = matchedData(req)
    const doesCityExist = await helpers.cityExists(req.name)
    if (!doesCityExist) {
      res.status(201).json(await db.createItem(req, City))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { createCity }
