const { buildErrObject } = require('../../../middleware/utils')

/**
 * Verifies a user
 * @param {Object} user - user object
 */
const verifyUser = async (user = {}) => {
  try {
    user.verified = true
    const savedUser = await user.save()
    return {
      email: savedUser.email,
      verified: savedUser.verified
    }
  } catch (err) {
    throw buildErrObject(422, err.message)
  }
}

module.exports = { verifyUser }
