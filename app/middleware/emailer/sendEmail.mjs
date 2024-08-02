import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

/**
 * Sends email
 * @param {Object} data - data
 * @returns {Promise<boolean>} - resolves to true if email is sent successfully, otherwise false
 */
export const sendEmail = async (data = {}) => {
  const auth = {
    auth: {
      api_key: process.env.EMAIL_SMTP_API_MAILGUN,
      domain: process.env.EMAIL_SMTP_DOMAIN_MAILGUN
    }
    // host: 'api.eu.mailgun.net' // THIS IS NEEDED WHEN USING EUROPEAN SERVERS
  }
  const transporter = nodemailer.createTransport(mg(auth))
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: `${data.user.name} <${data.user.email}>`,
    subject: data.subject,
    html: data.htmlMessage
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return resolve(false)
      }
      return resolve(true)
    })
  })
}
