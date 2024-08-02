import * as utils from '../../middleware/utils/index.mjs'
import { matchedData } from 'express-validator'
import * as auth from '../../middleware/auth/index.mjs'
import * as helpers from './helpers/index.mjs'

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const changePassword = async (req, res) => {
  try {
    const id = await utils.isIDGood(req.user._id)
    const user = await helpers.findUser(id)
    const data = matchedData(req)

    const isPasswordMatch = await auth.checkPassword(data.oldPassword, user)
    if (!isPasswordMatch) {
      return utils.handleError(res, utils.buildErrObject(409, 'WRONG_PASSWORD'))
    }

    // all ok, proceed to change password
    const result = await helpers.changePasswordInDB(id, data)
    return res.status(200).json(result)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { changePassword }
