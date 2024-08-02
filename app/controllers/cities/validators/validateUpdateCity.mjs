import * as utils from '../../../middleware/utils/index.mjs'
import { check } from 'express-validator'

/**
 * Validates update item request
 */
const validateUpdateCity = [
  check('name')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY'),
  check('id')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    utils.validateResult(req, res, next)
  }
]

export { validateUpdateCity }
