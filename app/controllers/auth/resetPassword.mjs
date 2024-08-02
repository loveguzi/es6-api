import { matchedData } from 'express-validator'
import * as helpers from './helpers/index.mjs'
import { handleError } from '../../middleware/utils/index.mjs'

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req, res) => {
  try {
    const data = matchedData(req)
    const forgotPassword = await helpers.findForgotPassword(data.id)
    const user = await helpers.findUserToResetPassword(forgotPassword.email)
    await helpers.updatePassword(data.password, user)
    const result = await helpers.markResetPasswordAsUsed(req, forgotPassword)
    res.status(200).json(result)
  } catch (error) {
    handleError(res, error)
  }
}

export { resetPassword }
