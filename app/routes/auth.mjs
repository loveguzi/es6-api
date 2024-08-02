import express from 'express'
import passport from 'passport'
import * as userAuth from '../controllers/auth/index.mjs'
import * as userAuthValidators from '../controllers/auth/validators/index.mjs'
import { trimRequestMiddleware } from '../middleware/utils/trimRequestMiddleware.mjs'
import '../../config/passport.mjs'

const router = express.Router()
const requireAuth = passport.authenticate('jwt', { session: false })

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post(
  '/register',
  trimRequestMiddleware,
  userAuthValidators.validateRegister,
  userAuth.register
)

/*
 * Verify route
 */
router.post(
  '/verify',
  trimRequestMiddleware,
  userAuthValidators.validateVerify,
  userAuth.verify
)

/*
 * Forgot password route
 */
router.post(
  '/forgot',
  trimRequestMiddleware,
  userAuthValidators.validateForgotPassword,
  userAuth.forgotPassword
)

/*
 * Reset password route
 */
router.post(
  '/reset',
  trimRequestMiddleware,
  userAuthValidators.validateResetPassword,
  userAuth.resetPassword
)

/*
 * Get new refresh token
 */
router.get(
  '/token',
  requireAuth,
  userAuth.roleAuthorization(['user', 'admin']),
  trimRequestMiddleware,
  userAuth.getRefreshToken
)

/*
 * Login route
 */
router.post(
  '/login',
  trimRequestMiddleware,
  userAuthValidators.validateLogin,
  userAuth.login
)

export default router
