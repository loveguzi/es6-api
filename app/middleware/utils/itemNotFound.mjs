import { buildErrObject } from './buildErrObject.mjs'

/**
 * Item not found
 * @param {object} err - error object
 * @param {object} item - item result object
 * @param {string} message - message
 * @throws Will throw an error if the item is not found or if there is an error
 */
export const itemNotFound = async (
  err = {},
  item = {},
  message = 'NOT_FOUND'
) => {
  if (err) {
    throw buildErrObject(422, err.message)
  }
  if (!item) {
    throw buildErrObject(404, message)
  }
}
