const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks the query string for filtering records
 * query.filter should be the text to search (string)
 * query.fields should be the fields to search into (array)
 * @param {Object} query - query object
 * @returns {Promise<Object>} - filter query
 */
const checkQueryString = async (query = {}) => {
  try {
    if (
      typeof query.filter !== 'undefined' &&
      typeof query.fields !== 'undefined'
    ) {
      const data = {
        $or: []
      }
      const array = []

      // Takes filter param and builds an array by splitting with ','
      const arrayFilters = query.filter.split(',')

      // Takes fields param and builds an array by splitting with ','
      const arrayFields = query.fields.split(',')

      // Adds SQL Like %word% with regex for each filter and each field
      arrayFilters.forEach((filter) => {
        arrayFields.forEach((field) => {
          array.push({
            [field]: {
              $regex: new RegExp(filter.trim(), 'i')
            }
          })
        })
      })

      // Puts array result in data
      data.$or = array
      return data
    } else {
      return {}
    }
  } catch (err) {
    console.log(err.message)
    throw buildErrObject(422, 'ERROR_WITH_FILTER')
  }
}

module.exports = { checkQueryString }
