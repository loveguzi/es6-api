import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'
import mongoosePaginate from 'mongoose-paginate-v2'
import * as auth from '../middleware/auth/index.mjs'

const ENCRYPT_COLUMNS = ['name', 'email', 'phone'] // Columns to be encrypted

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      // validate: {
      //   validator: validator.isEmail,
      //   message: 'EMAIL_IS_NOT_VALID'
      // },
      // lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    verification: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    urlTwitter: {
      type: String,
      validate: {
        validator: (v) => (v === '' ? true : validator.isURL(v)),
        message: 'NOT_A_VALID_URL'
      },
      lowercase: true
    },
    urlGitHub: {
      type: String,
      validate: {
        validator: (v) => (v === '' ? true : validator.isURL(v)),
        message: 'NOT_A_VALID_URL'
      },
      lowercase: true
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

// Function to hash password
const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash

    // Encrypt specified fields before saving if DATA_ANONYMIZATION is true
    if (process.env.DATA_ANONYMIZATION === 'true') {
      ENCRYPT_COLUMNS.forEach((field) => {
        if (user.isModified(field)) {
          user[field] = auth.encrypt(user[field])
        }
      })
    }

    return next()
  })
}

// Function to generate salt
const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

// Pre-save middleware for hashing password and encrypting fields
UserSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    // Encrypt specified fields before saving if DATA_ANONYMIZATION is true
    if (process.env.DATA_ANONYMIZATION === 'true') {
      ENCRYPT_COLUMNS.forEach((field) => {
        if (that.isModified(field)) {
          that[field] = auth.encrypt(that[field])
        }
      })
    }

    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

// Method to decrypt fields when returning the user document
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  if (process.env.DATA_ANONYMIZATION === 'true') {
    ENCRYPT_COLUMNS.forEach((field) => {
      if (userObject[field]) {
        userObject[field] = auth.decrypt(userObject[field])
      }
    })
  }
  return userObject
}

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}

UserSchema.plugin(mongoosePaginate)

export default mongoose.model('User', UserSchema)
