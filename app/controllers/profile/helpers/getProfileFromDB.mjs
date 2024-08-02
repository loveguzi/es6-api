import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = async (id = '') => {
  try {
    const user = await User.findById(id, '-_id -updatedAt -createdAt').exec()
    await utils.itemNotFound(null, user, 'NOT_FOUND')
    return user
  } catch (error) {
    throw error
  }
}

export { getProfileFromDB }
