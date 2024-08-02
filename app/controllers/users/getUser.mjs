import User from '../../models/user.mjs'
import { matchedData } from 'express-validator'
import * as utils from '../../middleware/utils/index.mjs'
import * as db from '../../middleware/db/index.mjs'

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUser = async (req, res) => {
  try {
    const data = matchedData(req)
    const id = await utils.isIDGood(data.id)
    const user = await db.getItem(id, User)
    res.status(200).json(user)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { getUser }
