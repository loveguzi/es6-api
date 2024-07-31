const { buildErrObject } = require('../../../middleware/utils')

/**
 * Saves login attempts to database
 * @param {Object} user - user object
 */
const saveLoginAttemptsToDB = async (user = {}) => {
  try {
    await user.save()
    return true
  } catch (err) {
    throw buildErrObject(422, err.message)
  }
}

module.exports = { saveLoginAttemptsToDB }
