const City = require('../../../models/city')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 * @returns {Promise<boolean>}
 */
const cityExists = async (name = '') => {
  try {
    const item = await City.findOne({ name }).exec()
    if (item) {
      throw buildErrObject(422, 'CITY_ALREADY_EXISTS')
    }
    return false
  } catch (err) {
    throw buildErrObject(422, err.message)
  }
}

module.exports = { cityExists }
