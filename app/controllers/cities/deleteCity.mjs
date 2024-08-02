import City from '../../models/city.mjs'
import { matchedData } from 'express-validator'
import * as utils from '../../middleware/utils/index.mjs'
import * as db from '../../middleware/db/index.mjs'

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteCity = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, City))
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { deleteCity }
