import { generateToken } from './generateToken.mjs'

/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 * @returns {Promise<Object>} - Object containing the token and user information
 */
const returnRegisterToken = async (
  { _id = '', verification = '' },
  userInfo = {}
) => {
  return new Promise((resolve) => {
    if (process.env.NODE_ENV !== 'production') {
      userInfo.verification = verification
    }
    const data = {
      token: generateToken(_id),
      user: userInfo
    }
    resolve(data)
  })
}

export { returnRegisterToken }
