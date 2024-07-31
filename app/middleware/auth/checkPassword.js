const { buildErrObject } = require('../../middleware/utils')
const util = require('util')

/**
 * Checks if password matches
 * @param {string} password - password
 * @param {Object} user - user object
 * @returns {boolean}
 */
const checkPassword = async (password = '', user = {}) => {
  try {
    const comparePassword = util.promisify(user.comparePassword).bind(user)
    const isMatch = await comparePassword(password)
    return isMatch
  } catch (err) {
    throw buildErrObject(422, err.message)
  }
}

module.exports = { checkPassword }
