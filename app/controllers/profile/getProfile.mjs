import * as helpers from './helpers/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProfile = async (req, res) => {
  try {
    const id = await utils.isIDGood(req.user._id)
    const profile = await helpers.getProfileFromDB(id)
    res.status(200).json(profile)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { getProfile }
