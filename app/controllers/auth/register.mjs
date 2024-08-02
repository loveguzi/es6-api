import { matchedData } from 'express-validator'
import * as helpers from './helpers/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'
import * as emailer from '../../middleware/emailer/index.mjs'

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    const data = matchedData(req)
    const doesEmailExist = await emailer.emailExists(data.email)

    if (!doesEmailExist) {
      const item = await helpers.registerUser(data)
      const userInfo = await helpers.setUserInfo(item)
      const response = await helpers.returnRegisterToken(item, userInfo)
      emailer.sendRegistrationEmailMessage(locale, item) // Ensure the email is sent after token generation
      // Ensure the email is sent after token generation
      res.status(201).json(response)
    } else {
      res.status(400).json({ message: 'Email already exists' })
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { register }
