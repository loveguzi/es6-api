import * as utils from '../utils/index.mjs'

/**
 * Checks if password matches
 * @param {string} password - password
 * @param {Object} user - user object
 * @returns {boolean}
 */
export const checkPassword = async (password = '', user = {}) => {
  try {
    const isMatch = await new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return reject(err)
        }
        resolve(isMatch)
      })
    })
    return isMatch
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}
