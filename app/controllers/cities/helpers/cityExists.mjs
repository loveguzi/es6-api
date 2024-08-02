import City from '../../../models/city.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 * @returns {Promise<boolean>}
 */
const cityExists = async (name = '') => {
  try {
    const item = await City.findOne({ name }).exec()
    if (item) {
      throw utils.buildErrObject(422, 'CITY_ALREADY_EXISTS')
    }
    return false
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { cityExists }
