import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'
import * as auth from '../../../middleware/auth/index.mjs'

/**
 * Finds user by email
 * @param {string} email - user's email
 * @returns {Promise<Object>} - The found user object
 * @throws {Error} - Throws an error if the user is not found
 */
const findUser = async (email = '') => {
  try {
    // de-identification
    const searchEmail = process.env.DATA_ANONYMIZATION
      ? auth.encrypt(email)
      : email

    const item = await User.findOne(
      {
        email: searchEmail
      },
      'password loginAttempts blockExpires name email role verified verification'
    )
    await utils.itemNotFound(null, item, 'USER_DOES_NOT_EXIST')
    return item
  } catch (error) {
    throw error
  }
}

export { findUser }
