import { config as dotenvConfig } from 'dotenv-safe'
import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'
import bodyParser from 'body-parser'
import i18n from 'i18n'
import initMongo from './config/mongo.mjs'
import path from 'path'
import { fileURLToPath } from 'url'
import Redis from 'ioredis'
import routes from './app/routes/index.mjs'

// Load environment variables from the corresponding .env file
const envFile = `.env.${process.env.NODE_ENV || 'development'}`
dotenvConfig({ path: envFile })

// Setup express server port from ENV, default: 3000
const app = express()
app.set('port', process.env.PORT || 3000)

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Redis cache enabled by env variable
if (process.env.USE_REDIS === 'true') {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  })

  const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl
    const cachedResponse = await redisClient.get(key)
    if (cachedResponse) {
      res.send(JSON.parse(cachedResponse))
    } else {
      res.sendResponse = res.send
      res.send = async (body) => {
        await redisClient.set(key, JSON.stringify(body), 'EX', 60) // 60 seconds TTL
        res.sendResponse(body)
      }
      next()
    }
  }

  app.use(cacheMiddleware)
}

// for parsing json
app.use(bodyParser.json({ limit: '20mb' }))

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

// i18n configuration
i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(process.cwd(), 'locales'),
  defaultLocale: 'en',
  objectNotation: true
})
app.use(i18n.init)

// Init all other stuff
app.use(cors())
app.use(passport.initialize())
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.set('views', path.join(process.cwd(), 'views'))

// Using dynamic import
const ejs = await import('ejs')
app.engine('html', ejs.renderFile)

app.set('view engine', 'html')
app.use(routes)

app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')}`)
})

// Init MongoDB
initMongo()

export default app // for testing
