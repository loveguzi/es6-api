import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Checks if verification id exists for user
 * @param {string} id - verification id
 * @returns {Promise<Object>} - The user object if verification exists
 * @throws {Error} - Throws an error if verification does not exist or user is already verified
 */
const verificationExists = async (id = '') => {
  try {
    const user = await User.findOne({
      verification: id,
      verified: false
    }).exec()
    await utils.itemNotFound(null, user, 'NOT_FOUND_OR_ALREADY_VERIFIED')

    return user
  } catch (error) {
    throw error
  }
}

export { verificationExists }
