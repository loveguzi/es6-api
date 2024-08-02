import i18n from 'i18n'
import { prepareToSendEmail } from './prepareToSendEmail.mjs'

/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {object} user - user object
 */
export const sendRegistrationEmailMessage = (locale = '', user = {}) => {
  i18n.setLocale(locale)
  const subject = i18n.__('registration.SUBJECT')
  const htmlMessage = i18n.__(
    'registration.MESSAGE',
    user.name,
    process.env.FRONTEND_URL,
    user.verification
  )
  prepareToSendEmail(user, subject, htmlMessage)
}
