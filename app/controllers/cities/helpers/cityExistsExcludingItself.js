const City = require('../../../models/city')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 * @returns {Promise<boolean>}
 */
const cityExistsExcludingItself = async (id = '', name = '') => {
  try {
    const item = await City.findOne({
      name,
      _id: { $ne: id }
    }).exec()

    if (item) {
      throw buildErrObject(422, 'CITY_ALREADY_EXISTS')
    }

    return false
  } catch (err) {
    throw buildErrObject(422, err.message)
  }
}

module.exports = { cityExistsExcludingItself }
