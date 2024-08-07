import User from '../../../models/user.mjs'
import * as auth from '../../../middleware/auth/index.mjs'
import * as utils from '../../../middleware/utils/index.mjs'
import {
  USERS_ENCRYPT_COLUMNS,
  DATA_ANONYMIZATION
} from '../../../../config/constants.mjs'

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = async (req = {}, id = '') => {
  try {
    // Encrypt fields before updating if DATA_ANONYMIZATION is true
    if (DATA_ANONYMIZATION === 'true') {
      USERS_ENCRYPT_COLUMNS.forEach((field) => {
        if (req[field]) {
          req[field] = auth.encrypt(req[field])
        }
      })
    }

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
