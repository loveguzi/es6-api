import { matchedData } from 'express-validator'
import * as utils from '../../middleware/utils/index.mjs'
import * as emailer from '../../middleware/emailer/index.mjs'
import * as helpers from './helpers/index.mjs'

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createUser = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    const data = matchedData(req)
    const doesEmailExists = await emailer.emailExists(data.email)
    if (!doesEmailExists) {
      const item = await helpers.createItemInDb(data)
      emailer.sendRegistrationEmailMessage(locale, item)
      res.status(201).json(item)
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { createUser }
