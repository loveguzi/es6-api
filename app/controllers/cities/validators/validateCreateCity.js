const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new city request
 */
const validateCreateCity = [
  check('name').trim().notEmpty().withMessage('MISSING_OR_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateCity }
