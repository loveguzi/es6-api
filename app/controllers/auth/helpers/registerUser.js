const uuid = require('uuid')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = async (req = {}) => {
  try {
    const user = new User({
      name: req.name,
      email: req.email,
      password: req.password,
      verification: uuid.v4()
    })
    const savedUser = await user.save()
    return savedUser
  } catch (err) {
    throw buildErrObject(422, err.message)
  }
}

module.exports = { registerUser }
