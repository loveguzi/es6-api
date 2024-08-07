import * as auth from '../auth/index.mjs'
import * as utils from '../../middleware/utils/index.mjs'

/**
 * Checks the query string for filtering records
 * query.filter should be the text to search (string)
 * query.fields should be the fields to search into (array)
 * @param {Object} query - query object
 * @returns {Promise<Object>} - filter query
 */
export const checkQueryString = async (query = {}) => {
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

      // Takes encrypt param and builds an array by splitting with ','
      const arrayEncrypt = query.encrypt ? query.encrypt.split(',') : []

      // Adds SQL Like %word% with regex for each filter and each field
      // 2024.07.15 Deprecated.
      // filter:username,useremail
      // fields:name,email
      // query {
      //   '$or': [
      //     { name: 'username' },
      //     { email: 'username' },
      //     { name: 'useremail' },
      //     { email: 'emuseremailail' }
      //   ]
      // }
      // arrayFilters.forEach((filter) => {
      //   console.log('filter', filter)
      //   arrayFields.forEach((field) => {
      //     array.push({
      //       [field]: {
      //         $regex: new RegExp(filter.trim(), 'i')
      //       }
      //     })
      //   })
      // })

      // Adds exact match filter for each filter and each field
      arrayFilters.forEach((filter, index) => {
        if (arrayFields[index]) {
          let value = filter.trim()

          // Encrypt value if the field is in the encrypt list
          if (arrayEncrypt.includes(arrayFields[index])) {
            value = auth.encrypt(value)
          }

          array.push({
            [arrayFields[index]]: value
          })
        }
      })

      // Puts array result in data
      data.$or = array
      return data
    } else {
      return {}
    }
  } catch (err) {
    console.error(err.message)
    throw utils.buildErrObject(422, 'ERROR_WITH_FILTER')
  }
}
