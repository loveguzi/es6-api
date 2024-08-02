import * as utils from '../../../middleware/utils/index.mjs'
import { check } from 'express-validator'

/**
 * Validates create new city request
 */
const validateCreateCity = [
  check('name').trim().notEmpty().withMessage('MISSING_OR_EMPTY'),
  (req, res, next) => {
    utils.validateResult(req, res, next)
  }
]

export { validateCreateCity }
