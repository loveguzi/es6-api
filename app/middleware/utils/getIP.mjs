import requestIp from 'request-ip'

/**
 * Gets IP from user
 * @param {object} req - request object
 * @returns {string} IP address of the user
 */
export const getIP = (req) => requestIp.getClientIp(req)
