import * as utils from '../../../middleware/utils/index.mjs'
import { check } from 'express-validator'

/**
 * Validates change password request
 */
const validateChangePassword = [
  // Check if oldPassword is provided and meets the length requirement
  check('oldPassword')
    .notEmpty()
    .withMessage('IS_EMPTY')
    .isLength({ min: 5 })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),

  // Check if newPassword is provided and meets the length requirement
  check('newPassword')
    .notEmpty()
    .withMessage('IS_EMPTY')
    .isLength({ min: 5 })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),

  // Validate the result
  (req, res, next) => {
    utils.validateResult(req, res, next)
  }
]

export { validateChangePassword }
