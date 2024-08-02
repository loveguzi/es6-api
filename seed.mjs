import { config as dotenvConfig } from 'dotenv-safe'
import { Seeder } from 'mongo-seeding'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from the corresponding .env file
const envFile = '.env.development'
dotenvConfig({ path: envFile })

const { MONGO_URI, DB_USER, DB_PASS } = process.env

const databaseUri = MONGO_URI.replace(
  'mongodb://',
  `mongodb://${DB_USER}:${DB_PASS}@`
)

// Seeder configuration
const seederConfig = {
  database: databaseUri,
  inputPath: path.resolve(__dirname, './data'),
  dropDatabase: false,
  extensions: ['.js', '.json', '.mjs'] // Ensure .mjs extension is included
}

const seeder = new Seeder(seederConfig)

const main = async () => {
  try {
    console.log('Connecting to MongoDB at', databaseUri)
    console.log('Seeding data from', seederConfig.inputPath)

    // Load data using dynamic import
    const userData = await import('./data/1.users/user.cjs')
    const cityData = await import('./data/2.cities/city.cjs')

    // Combine data for seeding
    const collections = [
      {
        name: 'users',
        documents: userData.default
      },
      {
        name: 'cities',
        documents: cityData.default
      }
    ]

    console.log('collections', collections) // Log collections to debug

    if (collections.length === 0) {
      console.error(
        'No collections found. Check if the data files are correctly placed and named.'
      )
      process.exit(1)
    }

    await seeder.import(collections)
    console.log('Seed complete!')
    process.exit(0)
  } catch (err) {
    console.error('Seeding error:', err)
    process.exit(1)
  }
}

main()
