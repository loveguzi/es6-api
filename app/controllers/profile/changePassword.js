const {
  isIDGood,
  handleError,
  buildErrObject
} = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { checkPassword } = require('../../middleware/auth')
const { findUser, changePasswordInDB } = require('./helpers')

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const changePassword = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const user = await findUser(id)
    const data = matchedData(req)

    const isPasswordMatch = await checkPassword(data.oldPassword, user)
    if (!isPasswordMatch) {
      return handleError(res, buildErrObject(409, 'WRONG_PASSWORD'))
    }

    // all ok, proceed to change password
    const result = await changePasswordInDB(id, data)
    return res.status(200).json(result)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { changePassword }
