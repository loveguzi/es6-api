import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Marks a request to reset password as used
 * @param {Object} req - request object
 * @param {Object} forgot - forgot object
 * @returns {Promise<Object>} - Success object indicating password change
 * @throws {Error} - Throws an error if the operation fails
 */
const markResetPasswordAsUsed = async (req = {}, forgot = {}) => {
  try {
    forgot.used = true
    forgot.ipChanged = utils.getIP(req)
    forgot.browserChanged = utils.getBrowserInfo(req)
    forgot.countryChanged = utils.getCountry(req)

    const item = await forgot.save()
    await utils.itemNotFound(null, item, 'NOT_FOUND')

    return utils.buildSuccObject('PASSWORD_CHANGED')
  } catch (error) {
    throw error
  }
}

export { markResetPasswordAsUsed }
