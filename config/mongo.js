const mongoose = require('mongoose')
const DB_URL = process.env.MONGO_URI
const loadModels = require('../app/models')

module.exports = async () => {
  const connect = async () => {
    try {
      mongoose.Promise = global.Promise
      await mongoose.connect(DB_URL, {
        socketTimeoutMS: 30000 // 필요한 경우 추가 옵션
      })
      let dbStatus = `*    DB Connection: OK\n****************************\n`
      if (process.env.NODE_ENV !== 'test') {
        // Prints initialization
        console.log('****************************')
        console.log('*    Starting Server')
        console.log(`*    Port: ${process.env.PORT || 3000}`)
        console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`)
        console.log(`*    Database: MongoDB`)
        console.log(dbStatus)
      }
    } catch (err) {
      let dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
      console.error(dbStatus)
    }
  }

  await connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

  loadModels()
}
