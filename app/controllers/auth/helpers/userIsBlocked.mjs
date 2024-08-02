import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Checks if blockExpires from user is greater than now
 * @param {Object} user - user object
 * @returns {Promise<boolean>} - Resolves to true if user is not blocked, otherwise rejects with an error
 */
const userIsBlocked = async (user = {}) => {
  if (user.blockExpires > new Date()) {
    throw utils.buildErrObject(409, 'BLOCKED_USER')
  }
  return true
}

export { userIsBlocked }
