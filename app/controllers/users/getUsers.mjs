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
    // const query = await db.checkQueryString(req.query)
    // console.log('query', query)
    // res.status(200).json(await db.getItems(req, User, query))

    // Get query string and parse it
    const query = await db.checkQueryString(req.query)

    // Set list options
    const options = await db.listInitOptions(req)

    // Retrieve data from the User model
    const paginatedItems = await User.paginate(query, options)

    // Retrieve data from the User model
    paginatedItems.docs = paginatedItems.docs.map((item) => {
      const doc = new User(item) // Ensure item is a Mongoose document
      const decryptedItem = doc.toJSON()
      return decryptedItem
    })

    // Clean pagination IDs
    const cleanedItems = db.cleanPaginationID(paginatedItems)

    // Send response
    res.status(200).json(cleanedItems)
  } catch (error) {
    utils.handleError(res, error)
  }
}

export { getUsers }
