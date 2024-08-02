/**
 * Builds sorting object
 * @param {string} sort - field to sort by
 * @param {number} order - order for query (1 for ascending, -1 for descending)
 * @returns {Object} - sorting object
 */
export const buildSort = (sort = 'createdAt', order = 1) => {
  return { [sort]: order }
}
