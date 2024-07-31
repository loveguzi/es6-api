/**
 * Builds sorting object
 * @param {string} sort - field to sort by
 * @param {number} order - order for query (1 for ascending, -1 for descending)
 * @returns {Object} - sorting object
 */
const buildSort = (sort = 'createdAt', order = 1) => {
  const sortBy = {}
  sortBy[sort] = order
  return sortBy
}

module.exports = { buildSort }
