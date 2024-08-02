/**
 * Creates an object with user info
 * @param {Object} req - request object
 * @returns {Promise<Object>} - Object containing user information
 */
const setUserInfo = async (req = {}) => {
  const user = {
    _id: req._id,
    name: req.name,
    email: req.email,
    role: req.role,
    verified: req.verified
  }

  // Adds verification for testing purposes
  if (process.env.NODE_ENV !== 'production') {
    user.verification = req.verification
  }

  return user
}

export { setUserInfo }
