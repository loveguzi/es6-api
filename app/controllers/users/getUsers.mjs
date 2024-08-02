import User from '../../models/user.mjs'
import * as utils from '../../middleware/utils/index.mjs'
import * as db from '../../middleware/db/index.mjs'

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    res.status(200).json(await db.getItems(req, User, query))
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { getUsers }
