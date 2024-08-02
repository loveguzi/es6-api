import { addHours } from 'date-fns'
import * as utils from '../../../middleware/utils/index.mjs'

const HOURS_TO_BLOCK = 2

/**
 * Blocks a user by setting blockExpires to the specified date based on constant HOURS_TO_BLOCK
 * @param {Object} user - user object
 * @returns {Promise<Object>} - Promise resolving with error object if user is blocked or rejecting with error object if there's an error
 */
const blockUser = async (user = {}) => {
  try {
    user.blockExpires = addHours(new Date(), HOURS_TO_BLOCK)
    const result = await user.save()
    return utils.buildErrObject(409, 'BLOCKED_USER')
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { blockUser }
