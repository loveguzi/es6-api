import { validationResult } from 'express-validator'
import { handleError } from './handleError.mjs'
import { buildErrObject } from './buildErrObject.mjs'

/**
 * Builds error for validation files
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next middleware function
 */
export const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase()
    }
    return next()
  } catch (err) {
    return handleError(res, buildErrObject(422, err.array()))
  }
}
