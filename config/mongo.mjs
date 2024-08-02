import mongoose from 'mongoose'
import { config as dotenvConfig } from 'dotenv-safe'
import loadModels from '../app/models/index.mjs'

// Load environment variables from the corresponding .env file
const envFile = `.env.${process.env.NODE_ENV || 'development'}`
dotenvConfig({ path: envFile })

const { MONGO_URI, DB_USER, DB_PASS, PORT, NODE_ENV } = process.env

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      user: DB_USER,
      pass: DB_PASS
    })
    const dbStatus = `*    DB Connection: OK\n****************************\n`
    if (NODE_ENV !== 'test') {
      // Prints initialization
      console.log('****************************')
      console.log('*    Starting Server')
      console.log(`*    Port: ${PORT || 3000}`)
      console.log(`*    NODE_ENV: ${NODE_ENV}`)
      console.log(`*    Database: MongoDB`)
      console.log(dbStatus)
    }
  } catch (err) {
    const dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
    console.error(dbStatus)
  }
}

const initMongo = async () => {
  await connectDB()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connectDB)

  loadModels()
}

export default initMongo
