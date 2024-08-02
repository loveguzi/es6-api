import * as utils from '../../../middleware/utils/index.mjs'
import { check } from 'express-validator'

/**
 * Validates get item request
 */
const validateGetUser = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    utils.validateResult(req, res, next)
  }
]

export { validateGetUser }
