import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Verifies a user
 * @param {Object} user - user object
 * @returns {Promise<Object>} - An object containing the email and verification status of the user
 * @throws {Error} - Throws an error if the operation fails
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
    throw utils.buildErrObject(422, err.message)
  }
}

export { verifyUser }
