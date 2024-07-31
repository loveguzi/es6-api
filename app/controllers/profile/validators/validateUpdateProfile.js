const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates update profile request
 */
const validateUpdateProfile = [
  // Check if name exists and is not empty
  check('name')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY'),

  // Check if phone exists and is not empty
  check('phone')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY')
    .trim(),

  // Check if city exists and is not empty
  check('city')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY')
    .trim(),

  // Check if country exists and is not empty
  check('country')
    .exists()
    .withMessage('MISSING')
    .notEmpty()
    .withMessage('IS_EMPTY')
    .trim(),

  // Check if urlTwitter is a valid URL if provided
  check('urlTwitter')
    .optional()
    .custom((value) => (value === '' ? true : validator.isURL(value)))
    .withMessage('NOT_A_VALID_URL'),

  // Check if urlGitHub is a valid URL if provided
  check('urlGitHub')
    .optional()
    .custom((value) => (value === '' ? true : validator.isURL(value)))
    .withMessage('NOT_A_VALID_URL'),

  // Validate the result
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateProfile }
