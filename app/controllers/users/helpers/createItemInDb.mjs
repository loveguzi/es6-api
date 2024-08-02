import { v4 as uuidv4 } from 'uuid'
import User from '../../../models/user.mjs'
import * as utils from '../../../middleware/utils/index.mjs'

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDb = async ({
  name = '',
  email = '',
  password = '',
  role = '',
  phone = '',
  city = '',
  country = ''
}) => {
  try {
    const user = new User({
      name,
      email,
      password,
      role,
      phone,
      city,
      country,
      verification: uuidv4()
    })
    const item = await user.save()

    const sanitizedItem = item.toObject()
    delete sanitizedItem.password
    delete sanitizedItem.blockExpires
    delete sanitizedItem.loginAttempts
    return sanitizedItem
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

export { createItemInDb }
