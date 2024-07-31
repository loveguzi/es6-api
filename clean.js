require('dotenv-safe').config()
const mongoose = require('mongoose')
const initMongo = require('./config/mongo')
const fs = require('fs')
const modelsPath = `./app/models`
const { removeExtensionFromFile } = require('./app/middleware/utils')

const clean = async () => {
  try {
    await initMongo()

    const models = fs.readdirSync(modelsPath).filter((file) => {
      return removeExtensionFromFile(file) !== 'index'
    })

    const deleteModelFromDB = async (model) => {
      model = require(`./app/models/${model}`)
      await model.deleteMany({})
    }

    const promiseArray = models.map(
      async (model) => await deleteModelFromDB(model)
    )
    await Promise.all(promiseArray)

    console.log('Cleanup complete!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

clean()
