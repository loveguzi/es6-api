import { sendEmail } from './sendEmail.mjs'

/**
 * Prepares to send email
 * @param {object} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
export const prepareToSendEmail = async (
  user = {},
  subject = '',
  htmlMessage = ''
) => {
  const userData = {
    name: user.name,
    email: user.email,
    verification: user.verification
  }

  const data = {
    user: userData,
    subject,
    htmlMessage
  }

  if (process.env.NODE_ENV === 'production') {
    try {
      const messageSent = await sendEmail(data)
      console.log(`Email ${messageSent ? 'SENT' : 'FAILED'} to: ${user.email}`)
    } catch (error) {
      console.error(`Email FAILED to: ${user.email}`, error)
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.log(data)
  }
}
