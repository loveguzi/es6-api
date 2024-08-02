import { matchedData } from 'express-validator'
import City from '../../models/city.mjs'
import * as db from '../../middleware/db/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCity = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.getItem(id, City))
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { getCity }
