import { saveLoginAttemptsToDB } from './saveLoginAttemptsToDB.mjs'
import { blockUser } from './blockUser.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

const LOGIN_ATTEMPTS = 5

/**
 * Adds one attempt to loginAttempts, then compares loginAttempts with the constant LOGIN_ATTEMPTS,
 * if is less returns wrong password, else returns blockUser function
 * @param {Object} user - user object
 * @returns {Promise} - Resolves or rejects based on the login attempts
 */
const passwordsDoNotMatch = async (user = {}) => {
  try {
    user.loginAttempts += 1
    await saveLoginAttemptsToDB(user)
    if (user.loginAttempts <= LOGIN_ATTEMPTS) {
      return Promise.reject(utils.buildErrObject(409, 'WRONG_PASSWORD'))
    }
    return Promise.resolve(await blockUser(user))
  } catch (error) {
    throw error
  }
}

export { passwordsDoNotMatch }
