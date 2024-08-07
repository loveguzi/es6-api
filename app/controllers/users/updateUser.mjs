import User from '../../models/user.mjs'
import { matchedData } from 'express-validator'
import * as auth from '../../middleware/auth/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'
import * as db from '../../middleware/db/index.mjs'
import * as emailer from '../../middleware/emailer/index.mjs'
import { DATA_ANONYMIZATION } from '../../../config/constants.mjs'
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)

    // de-identification
    req.name = DATA_ANONYMIZATION ? auth.encrypt(req.name) : req.name
    req.email = DATA_ANONYMIZATION ? auth.encrypt(req.email) : req.email
    req.phone = DATA_ANONYMIZATION ? auth.encrypt(req.phone) : req.phone

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
