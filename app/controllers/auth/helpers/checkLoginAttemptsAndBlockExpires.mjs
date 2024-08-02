import { blockIsExpired } from './blockIsExpired.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Checks if the user's block has expired and resets login attempts if it has
 * @param {Object} user - user object
 * @returns {Promise<boolean>} - Promise resolving to true if block is expired or user is not blocked
 */
const checkLoginAttemptsAndBlockExpires = async (user = {}) => {
  try {
    if (blockIsExpired(user)) {
      user.loginAttempts = 0
      const result = await user.save()
      return result ? true : false
    } else {
      // User is not blocked, check password (normal behaviour)
      return true
    }
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { checkLoginAttemptsAndBlockExpires }
