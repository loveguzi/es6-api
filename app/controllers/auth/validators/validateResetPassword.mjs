import * as utils from '../../../middleware/utils/index.mjs'
import { check } from 'express-validator'

/**
 * Validates reset password request
 */
const validateResetPassword = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY')
    .isLength({ min: 5 })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  (req, res, next) => {
    utils.validateResult(req, res, next)
  }
]

export { validateResetPassword }
