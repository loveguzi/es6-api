import { matchedData } from 'express-validator'
import * as helpers from './helpers/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verify = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await helpers.verificationExists(data.id)
    const result = await helpers.verifyUser(user)
    res.status(200).json(result)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { verify }
