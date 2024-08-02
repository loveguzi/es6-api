/**
 * Hack for mongoose-paginate, removes 'id' from results
 * @param {Object} result - result object
 * @returns {Object} - result object with 'id' removed from docs
 */
export const cleanPaginationID = (result = {}) => {
  result.docs.forEach((element) => delete element.id)
  return result
}
