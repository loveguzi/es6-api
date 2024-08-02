import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Checks against user if has requested role
 * @param {Object} data - data object
 * @param {string} data.id - User ID
 * @param {Array<string>} data.roles - Array of roles to check against
 * @param {Function} next - Next callback
 */
const checkPermissions = async ({ id = '', roles = [] }, next) => {
  try {
    const result = await User.findById(id)
    await utils.itemNotFound(null, result, 'USER_NOT_FOUND')
    if (roles.includes(result.role)) {
      return next()
    } else {
      throw utils.buildErrObject(401, 'UNAUTHORIZED')
    }
  } catch (error) {
    throw error
  }
}

export { checkPermissions }
