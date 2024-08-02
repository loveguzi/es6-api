import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Finds user by email to reset password
 * @param {string} email - user email
 * @returns {Promise<Object>} - The found user object
 * @throws {Error} - Throws an error if the user is not found
 */
const findUserToResetPassword = async (email = '') => {
  try {
    const user = await User.findOne({ email }).exec()
    await utils.itemNotFound(null, user, 'NOT_FOUND')
    return user
  } catch (error) {
    throw error
  }
}

export { findUserToResetPassword }
