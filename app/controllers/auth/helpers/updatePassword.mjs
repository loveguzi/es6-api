import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Updates a user password in database
 * @param {string} password - new password
 * @param {Object} user - user object
 * @returns {Promise<Object>} - The updated user object
 * @throws {Error} - Throws an error if the operation fails
 */
const updatePassword = async (password = '', user = {}) => {
  try {
    user.password = password
    const item = await user.save()
    await utils.itemNotFound(null, item, 'NOT_FOUND')
    return item
  } catch (error) {
    throw error
  }
}

export { updatePassword }
