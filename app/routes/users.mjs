import express from 'express'
import passport from 'passport'
import trimRequest from 'trim-request'
import * as auth from '../controllers/auth/index.mjs'
import * as users from '../controllers/users/index.mjs'
import * as usersValidators from '../controllers/users/validators/index.mjs'
import '../../config/passport.mjs'

const router = express.Router()
const requireAuth = passport.authenticate('jwt', { session: false })

/*
 * Users routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequest.all,
  users.getUsers
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequest.all,
  usersValidators.validateCreateUser,
  users.createUser
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequest.all,
  usersValidators.validateGetUser,
  users.getUser
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequest.all,
  usersValidators.validateUpdateUser,
  users.updateUser
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  auth.roleAuthorization(['admin']),
  trimRequest.all,
  usersValidators.validateDeleteUser,
  users.deleteUser
)

export default router
