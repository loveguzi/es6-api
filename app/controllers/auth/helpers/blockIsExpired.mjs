const LOGIN_ATTEMPTS = 5

/**
 * Checks that login attempts are greater than specified in constant and also that blockExpires is less than now
 * @param {Object} user - user object
 * @param {number} user.loginAttempts - Number of login attempts
 * @param {string|Date} user.blockExpires - Block expiration date
 * @returns {boolean} - Whether the block is expired
 */
const blockIsExpired = ({ loginAttempts = 0, blockExpires = '' }) =>
  loginAttempts > LOGIN_ATTEMPTS && new Date(blockExpires) <= new Date()

export { blockIsExpired }
