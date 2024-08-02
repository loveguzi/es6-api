import express from 'express'
import passport from 'passport'
import * as auth from '../controllers/auth/index.mjs'
import * as cities from '../controllers/cities/index.mjs'
import * as citiesValidators from '../controllers/cities/validators/index.mjs'
import { trimRequestMiddleware } from '../middleware/utils/trimRequestMiddleware.mjs'
import '../../config/passport.mjs'

const router = express.Router()
const requireAuth = passport.authenticate('jwt', { session: false })

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', cities.getAllCities)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequestMiddleware,
  cities.getCities
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequestMiddleware,
  citiesValidators.validateCreateCity,
  cities.createCity
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequestMiddleware,
  citiesValidators.validateGetCity,
  cities.getCity
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequestMiddleware,
  citiesValidators.validateUpdateCity,
  cities.updateCity
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequestMiddleware,
  citiesValidators.validateDeleteCity,
  cities.deleteCity
)

export default router
