import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Finds user by ID
 * @param {string} userId - user's ID
 * @returns {Promise<Object>} - The found user object
 * @throws {Error} - Throws an error if the user is not found
 */
const findUserById = async (userId = '') => {
  try {
    const item = await User.findById(userId)
    await utils.itemNotFound(null, item, 'USER_DOES_NOT_EXIST')
    return item
  } catch (error) {
    throw error
  }
}

export { findUserById }
