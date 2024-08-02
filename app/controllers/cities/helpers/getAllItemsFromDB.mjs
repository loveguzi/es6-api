import City from '../../../models/city.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Gets all items from database
 * @returns {Promise<Array>} - List of all cities
 */
const getAllItemsFromDB = async () => {
  try {
    const items = await City.find({}, '-updatedAt -createdAt')
      .sort({ name: 1 })
      .exec()
    return items
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { getAllItemsFromDB }
