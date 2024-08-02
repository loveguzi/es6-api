import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Finds user by id
 * @param {string} id - user id
 */
const findUser = async (id = '') => {
  try {
    const user = await User.findById(id, 'password email').exec()
    await utils.itemNotFound(null, user, 'USER_DOES_NOT_EXIST')
    return user
  } catch (error) {
    throw error
  }
}

export { findUser }
