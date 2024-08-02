import { matchedData } from 'express-validator'
import * as helpers from './helpers/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'
import * as auth from '../../middleware/auth/index.mjs'

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await helpers.findUser(data.email)
    await helpers.userIsBlocked(user)
    await helpers.checkLoginAttemptsAndBlockExpires(user)
    const isPasswordMatch = await auth.checkPassword(data.password, user)
    if (!isPasswordMatch) {
      utils.handleError(res, await helpers.passwordsDoNotMatch(user))
    } else {
      // all ok, register access and return token
      user.loginAttempts = 0
      await helpers.saveLoginAttemptsToDB(user)
      res
        .status(200)
        .json(await helpers.saveUserAccessAndReturnToken(req, user))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { login }
