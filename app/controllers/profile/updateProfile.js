const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateProfileInDB } = require('./helpers')

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProfile = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const data = matchedData(req)
    const updatedProfile = await updateProfileInDB(data, id)
    res.status(200).json(updatedProfile)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateProfile }
