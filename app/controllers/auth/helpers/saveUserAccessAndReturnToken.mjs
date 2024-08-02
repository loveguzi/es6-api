import UserAccess from '../../../models/userAccess.mjs'
import { setUserInfo } from './setUserInfo.mjs'
import { generateToken } from './generateToken.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 * @returns {Promise<Object>} - Object containing the token and user information
 * @throws {Error} - Throws an error if the operation fails
 */
const saveUserAccessAndReturnToken = async (req = {}, user = {}) => {
  try {
    const userAccess = new UserAccess({
      email: user.email,
      ip: utils.getIP(req),
      browser: utils.getBrowserInfo(req),
      country: utils.getCountry(req)
    })
    await userAccess.save()
    const userInfo = await setUserInfo(user)
    // Returns data with access token
    return {
      token: generateToken(user._id),
      user: userInfo
    }
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { saveUserAccessAndReturnToken }
