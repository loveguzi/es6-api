import City from '../../models/city.mjs'
import * as db from '../../middleware/db/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'
import { matchedData } from 'express-validator'
import * as helpers from './helpers/index.mjs'

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateCity = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    const doesCityExist = await helpers.cityExistsExcludingItself(id, req.name)
    if (!doesCityExist) {
      res.status(200).json(await db.updateItem(id, City, req))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { updateCity }
