import { matchedData } from 'express-validator'
import * as helpers from './helpers/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'
import * as emailer from '../../middleware/emailer/index.mjs'

/**
 * Forgot password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const forgotPassword = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    const data = matchedData(req)
    await helpers.findUser(data.email)
    const item = await helpers.saveForgotPassword(req)
    emailer.sendResetPasswordEmailMessage(locale, item)
    res.status(200).json(helpers.forgotPasswordResponse(item))
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { forgotPassword }
