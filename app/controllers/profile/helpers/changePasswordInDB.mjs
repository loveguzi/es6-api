import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Changes password in database
 * @param {string} id - user id
 * @param {Object} req - request object
 */
const changePasswordInDB = async (id = '', req = {}) => {
  try {
    const user = await User.findById(id, '+password').exec()
    await utils.itemNotFound(null, user, 'NOT_FOUND')

    // Assigns new password to user
    user.password = req.newPassword

    // Saves in DB
    await user.save()
    return utils.buildSuccObject('PASSWORD_CHANGED')
  } catch (error) {
    throw utils.buildErrObject(422, error.message)
  }
}

export { changePasswordInDB }
