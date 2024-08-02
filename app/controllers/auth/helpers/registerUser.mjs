import { v4 as uuidv4 } from 'uuid'
import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Registers a new user in database
 * @param {Object} req - request object
 * @returns {Promise<Object>} - The saved user object
 * @throws {Error} - Throws an error if user registration fails
 */
const registerUser = async (req = {}) => {
  try {
    const user = new User({
      name: req.name,
      email: req.email,
      password: req.password,
      verification: uuidv4()
    })
    const savedUser = await user.save()

    // de-identification - Return decrypted user object
    return savedUser.toJSON()
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { registerUser }
