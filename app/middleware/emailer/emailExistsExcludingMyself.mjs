import User from '../../models/user.mjs'
import * as utils from '../utils/index.mjs'

/**
 * Checks User model if user with a specific email exists but excluding user id
 * @param {string} id - user id
 * @param {string} email - user email
 * @returns {Promise<boolean>}
 */
export const emailExistsExcludingMyself = async (id = '', email = '') => {
  try {
    const user = await User.findOne({
      email,
      _id: { $ne: id }
    }).exec()

    if (user) {
      throw utils.buildErrObject(422, 'EMAIL_ALREADY_EXISTS')
    }
    return false
  } catch (err) {
    throw utils.buildErrObject(422, err.message || 'An error occurred')
  }
}
