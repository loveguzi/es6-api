import ForgotPassword from '../../../models/forgotPassword.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Checks if a forgot password verification exists
 * @param {string} id - verification id
 * @returns {Promise<Object>} - Returns the found forgot password item
 */
const findForgotPassword = async (id = '') => {
  try {
    const item = await ForgotPassword.findOne({
      verification: id,
      used: false
    }).exec()
    await utils.itemNotFound(null, item, 'NOT_FOUND_OR_ALREADY_USED')
    return item
  } catch (error) {
    throw error
  }
}

export { findForgotPassword }
