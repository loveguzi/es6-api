import { v4 as uuidv4 } from 'uuid'
import ForgotPassword from '../../../models/forgotPassword.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Creates a new password forgot
 * @param {Object} req - request object
 * @returns {Promise<Object>} - The created forgot password object
 * @throws {Error} - Throws an error if the operation fails
 */
const saveForgotPassword = async (req = {}) => {
  try {
    const forgot = new ForgotPassword({
      email: req.body.email,
      verification: uuidv4(),
      ipRequest: utils.getIP(req),
      browserRequest: utils.getBrowserInfo(req),
      countryRequest: utils.getCountry(req)
    })
    const item = await forgot.save()

    // de-identification - Return decrypted user object
    return item.toJSON()
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { saveForgotPassword }
