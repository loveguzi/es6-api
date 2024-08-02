import User from '../../models/user.mjs'
import { matchedData } from 'express-validator'
import * as utils from '../../middleware/utils/index.mjs'
import * as db from '../../middleware/db/index.mjs'
import * as emailer from '../../middleware/emailer/index.mjs'

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    const doesEmailExists = await emailer.emailExistsExcludingMyself(
      id,
      req.email
    )
    if (!doesEmailExists) {
      res.status(200).json(await db.updateItem(id, User, req))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { updateUser }
