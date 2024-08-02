import * as helpers from './helpers/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'

/**
 * Roles authorization function called by route
 * @param {Array} roles - roles specified on the route
 */
const roleAuthorization = (roles) => async (req, res, next) => {
  try {
    const data = {
      id: req.user._id,
      roles
    }
    await helpers.checkPermissions(data, next)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { roleAuthorization }
