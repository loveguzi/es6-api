import jwt from 'jsonwebtoken'
import * as auth from '../../../middleware/auth/index.mjs'

/**
 * Generates a token
 * @param {Object} user - user object
 * @returns {string} - Signed and encrypted token
 * @throws {Error} - Throws an error if token generation fails
 */
const generateToken = (user = '') => {
  try {
    // Gets expiration time
    const expiration =
      Math.floor(Date.now() / 1000) +
      60 * parseInt(process.env.JWT_EXPIRATION_IN_MINUTES, 10)

    // returns signed and encrypted token
    return auth.encrypt(
      jwt.sign(
        {
          data: {
            _id: user
          },
          exp: expiration
        },
        process.env.JWT_SECRET
      )
    )
  } catch (error) {
    throw error
  }
}

export { generateToken }
