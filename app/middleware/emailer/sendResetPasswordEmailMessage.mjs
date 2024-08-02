import i18n from 'i18n'
import { prepareToSendEmail } from './prepareToSendEmail.mjs'

/**
 * Sends reset password email
 * @param {string} locale - locale
 * @param {object} user - user object
 */
export const sendResetPasswordEmailMessage = (locale = '', user = {}) => {
  i18n.setLocale(locale)
  const subject = i18n.__('forgotPassword.SUBJECT')
  const htmlMessage = i18n.__(
    'forgotPassword.MESSAGE',
    user.email,
    process.env.FRONTEND_URL,
    user.verification
  )
  prepareToSendEmail(user, subject, htmlMessage)
}
