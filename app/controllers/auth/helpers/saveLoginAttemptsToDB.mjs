import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Saves login attempts to database
 * @param {Object} user - user object
 * @returns {Promise<boolean>} - Resolves to true if the operation is successful
 * @throws {Error} - Throws an error if the operation fails
 */
const saveLoginAttemptsToDB = async (user = {}) => {
  try {
    await user.save()
    return true
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { saveLoginAttemptsToDB }
