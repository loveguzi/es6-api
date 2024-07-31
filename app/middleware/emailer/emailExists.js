const User = require('../../models/user')
const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks User model if user with a specific email exists
 * @param {string} email - user email
 * @returns {Promise<boolean>}
 */
const emailExists = async (email = '') => {
  try {
    const user = await User.findOne({ email }).exec()
    if (user) {
      throw buildErrObject(422, 'EMAIL_ALREADY_EXISTS')
    }
    return false
  } catch (err) {
    throw buildErrObject(422, err.message)
  }
}

module.exports = { emailExists }
