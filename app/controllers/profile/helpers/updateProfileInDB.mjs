import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = async (req = {}, id = '') => {
  try {
    const user = await User.findByIdAndUpdate(id, req, {
      new: true,
      runValidators: true,
      select: '-role -_id -updatedAt -createdAt'
    }).exec()
    await utils.itemNotFound(null, user, 'NOT_FOUND')
    return user
  } catch (error) {
    throw error
  }
}

export { updateProfileInDB }
