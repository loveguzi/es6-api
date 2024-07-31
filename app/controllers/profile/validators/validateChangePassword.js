const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

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
    validateResult(req, res, next)
  }
]

module.exports = { validateChangePassword }
