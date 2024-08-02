import { config as dotenvConfig } from 'dotenv-safe'
import mongoose from 'mongoose'
import initMongo from './config/mongo.mjs'
import fs from 'fs/promises'
import * as utils from './app/middleware/utils/index.mjs'
import { fi } from '@faker-js/faker'
import { exit } from 'process'

const envFile = '.env.development'
dotenvConfig({ path: envFile })

const modelsPath = './app/models'

const clean = async () => {
  try {
    await initMongo()

    const files = await fs.readdir(modelsPath)
    const models = files.filter(
      (file) => utils.removeExtensionFromFile(file) !== 'index'
    )

    const deleteModelFromDB = async (model) => {
      const Model = await import(`./app/models/${model}`)
      await Model.default.deleteMany({})
    }

    const promiseArray = models.map((model) => deleteModelFromDB(model))
    await Promise.all(promiseArray)

    console.log('Cleanup complete!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

clean()
