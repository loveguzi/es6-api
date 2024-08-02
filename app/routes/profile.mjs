import express from 'express'
import passport from 'passport'
import * as auth from '../controllers/auth/index.mjs'
import * as profile from '../controllers/profile/index.mjs'
import * as profileValidators from '../controllers/profile/validators/index.mjs'
import { trimRequestMiddleware } from '../middleware/utils/trimRequestMiddleware.mjs'
import '../../config/passport.mjs'

const router = express.Router()
const requireAuth = passport.authenticate('jwt', { session: false })

/*
 * Profile routes
 */

/*
 * Get profile route
 */
router.get(
  '/',
  requireAuth,
  auth.roleAuthorization(['user', 'admin']),
  trimRequestMiddleware,
  profile.getProfile
)

/*
 * Update profile route
 */
router.patch(
  '/',
  requireAuth,
  auth.roleAuthorization(['user', 'admin']),
  trimRequestMiddleware,
  profileValidators.validateUpdateProfile,
  profile.updateProfile
)

/*
 * Change password route
 */
router.post(
  '/changePassword',
  requireAuth,
  auth.roleAuthorization(['user', 'admin']),
  trimRequestMiddleware,
  profileValidators.validateChangePassword,
  profile.changePassword
)

export default router
