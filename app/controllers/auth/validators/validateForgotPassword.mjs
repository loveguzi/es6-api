import * as utils from '../../../middleware/utils/index.mjs'
import { check } from 'express-validator'

/**
 * Validates forgot password request
 */
const validateForgotPassword = [
  check('email')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  (req, res, next) => {
    utils.validateResult(req, res, next)
  }
]

export { validateForgotPassword }
