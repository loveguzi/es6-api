import * as helpers from './helpers/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'

/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRefreshToken = async (req, res) => {
  try {
    const tokenEncrypted = req.headers.authorization
      .replace('Bearer ', '')
      .trim()
    let userId = await helpers.getUserIdFromToken(tokenEncrypted)
    userId = await utils.isIDGood(userId)
    const user = await helpers.findUserById(userId)
    const token = await helpers.saveUserAccessAndReturnToken(req, user)
    // Removes user info from response
    delete token.user
    res.status(200).json(token)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { getRefreshToken }
