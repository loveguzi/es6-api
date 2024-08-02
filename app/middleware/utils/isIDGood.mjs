import mongoose from 'mongoose'
import { buildErrObject } from './buildErrObject.mjs'

/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
 * @returns {Promise<string>} - resolves with the id if valid, otherwise rejects with an error
 * @throws Will throw an error if the id is not a valid MongoDB ObjectId
 */
export const isIDGood = async (id = '') => {
  const goodID = mongoose.Types.ObjectId.isValid(id)
  if (goodID) {
    return id
  } else {
    throw buildErrObject(422, 'ID_MALFORMED')
  }
}
