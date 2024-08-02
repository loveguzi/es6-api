import jwt from 'jsonwebtoken'
import * as utils from '../../../middleware/utils/index.mjs'
import * as auth from '../../../middleware/auth/index.mjs'

/**
 * Gets user id from token
 * @param {string} token - Encrypted and encoded token
 * @returns {Promise<string>} - User ID extracted from the token
 * @throws {Error} - Throws an error if token verification fails
 */
const getUserIdFromToken = (token = '') => {
  return new Promise((resolve, reject) => {
    // Decrypts, verifies and decodes token
    jwt.verify(auth.decrypt(token), process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(utils.buildErrObject(409, 'BAD_TOKEN'))
      }
      resolve(decoded.data._id)
    })
  })
}

export { getUserIdFromToken }
