import User from '../../models/user.mjs'
import * as utils from '../utils/index.mjs'
import * as auth from '../auth/index.mjs'

/**
 * Checks User model if user with a specific email exists
 * @param {string} email - user email
 * @returns {Promise<boolean>}
 */
export const emailExists = async (email = '') => {
  try {
    // de-identification
    const searchEmail = process.env.DATA_ANONYMIZATION
      ? auth.encrypt(email)
      : email

    const user = await User.findOne({ email: searchEmail }).exec()
    if (user) {
      throw utils.buildErrObject(422, 'EMAIL_ALREADY_EXISTS')
    }
    return false
  } catch (err) {
    throw utils.buildErrObject(422, err.message || 'An error occurred')
  }
}
