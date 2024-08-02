/**
 * Gets browser info from user
 * @param {object} req - request object
 * @returns {string} user-agent string
 */
export const getBrowserInfo = ({ headers }) => headers['user-agent']
