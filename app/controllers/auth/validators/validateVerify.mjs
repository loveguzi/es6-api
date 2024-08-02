import * as utils from '../../../middleware/utils/index.mjs'
import { check } from 'express-validator'

/**
 * Validates verify request
 */
const validateVerify = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    utils.validateResult(req, res, next)
  }
]

export { validateVerify }
