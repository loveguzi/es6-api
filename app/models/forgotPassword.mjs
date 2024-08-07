import mongoose from 'mongoose'
import validator from 'validator'
import * as auth from '../middleware/auth/index.mjs'
import {
  USERS_ENCRYPT_COLUMNS,
  DATA_ANONYMIZATION
} from '../../config/constants.mjs'

const ForgotPasswordSchema = new mongoose.Schema(
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
    verification: {
      type: String
    },
    used: {
      type: Boolean,
      default: false
    },
    ipRequest: {
      type: String
    },
    browserRequest: {
      type: String
    },
    countryRequest: {
      type: String
    },
    ipChanged: {
      type: String
    },
    browserChanged: {
      type: String
    },
    countryChanged: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

// Pre-save middleware for encrypting fields
ForgotPasswordSchema.pre('save', function (next) {
  const that = this
  if (DATA_ANONYMIZATION === 'true') {
    USERS_ENCRYPT_COLUMNS.forEach((field) => {
      if (that.isModified(field)) {
        that[field] = auth.encrypt(that[field])
      }
    })
  }
  next()
})

// Method to decrypt fields when returning the document
ForgotPasswordSchema.methods.toJSON = function () {
  const forgotPasswordObject = this.toObject()
  if (DATA_ANONYMIZATION === 'true') {
    USERS_ENCRYPT_COLUMNS.forEach((field) => {
      if (forgotPasswordObject[field]) {
        forgotPasswordObject[field] = auth.decrypt(forgotPasswordObject[field])
      }
    })
  }
  return forgotPasswordObject
}

export default mongoose.model('ForgotPassword', ForgotPasswordSchema)
