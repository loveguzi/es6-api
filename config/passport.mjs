import passport from 'passport'
import User from '../app/models/user.mjs'
import * as auth from '../app/middleware/auth/index.mjs'
import { Strategy as JwtStrategy } from 'passport-jwt'

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = (req) => {
  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }
  if (token) {
    // Decrypts token
    token = auth.decrypt(token)
  }
  return token
}

/**
 * Options object for jwt middleware
 */
const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.data._id)

    if (!user) {
      return done(null, false)
    }

    // Call the user's toJSON method to get the decrypted user object
    const userObj = user.toJSON()

    return done(null, userObj)
  } catch (err) {
    return done(err, false)
  }
})

passport.use(jwtLogin)

export default passport
