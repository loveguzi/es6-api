import * as utils from '../../middleware/utils/index.mjs'
import { matchedData } from 'express-validator'
import * as helpers from './helpers/index.mjs'

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProfile = async (req, res) => {
  try {
    const id = await utils.isIDGood(req.user._id)
    const data = matchedData(req)
    const updatedProfile = await helpers.updateProfileInDB(data, id)
    res.status(200).json(updatedProfile)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { updateProfile }
