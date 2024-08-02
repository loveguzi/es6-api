import mongoose from 'mongoose'
import validator from 'validator'
import * as auth from '../middleware/auth/index.mjs'

// Columns to be encrypted
const ENCRYPT_COLUMNS = ['email']

const UserAccessSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // validate: {
      //   validator: validator.isEmail,
      //   message: 'EMAIL_IS_NOT_VALID'
      // },
      // lowercase: true,
      required: true
    },
    ip: {
      type: String,
      required: true
    },
    browser: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

// Pre-save middleware for encrypting fields
UserAccessSchema.pre('save', function (next) {
  const that = this
  if (process.env.DATA_ANONYMIZATION === 'true') {
    ENCRYPT_COLUMNS.forEach((field) => {
      if (that.isModified(field)) {
        that[field] = auth.encrypt(that[field])
      }
    })
  }
  next()
})

// Method to decrypt fields when returning the document
UserAccessSchema.methods.toJSON = function () {
  const userAccessObject = this.toObject()
  if (process.env.DATA_ANONYMIZATION === 'true') {
    ENCRYPT_COLUMNS.forEach((field) => {
      if (userAccessObject[field]) {
        userAccessObject[field] = auth.decrypt(userAccessObject[field])
      }
    })
  }
  return userAccessObject
}

export default mongoose.model('UserAccess', UserAccessSchema)
