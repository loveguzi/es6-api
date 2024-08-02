import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import * as utils from '../middleware/utils/index.mjs'

const router = express.Router()

// Emulate __dirname in ES module environment
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const routesPath = `${__dirname}/`

/*
 * Load routes statically and/or dynamically
 */

// Load Auth route
import authRoute from './auth.mjs'
router.use('/', authRoute)

// Function to list all registered routes
const listRoutes = (router) => {
  const routes = []

  router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the router
      const method = Object.keys(middleware.route.methods)[0].toUpperCase()
      const path = middleware.route.path
      routes.push({ method, path })
    } else if (middleware.name === 'router') {
      // Routes added with router.use()
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const method = Object.keys(handler.route.methods)[0].toUpperCase()
          const path = handler.route.path
          routes.push({ method, path })
        }
      })
    }
  })

  return routes
}

// Function to dynamically load routes
const loadRoutes = async () => {
  const routeFiles = fs.readdirSync(routesPath).filter((file) => {
    const routeFile = utils.removeExtensionFromFile(file)
    // Prevent loading of this file and auth file
    return routeFile !== 'index' && routeFile !== 'auth' && file !== '.DS_Store'
  })

  for (const file of routeFiles) {
    const routeFile = utils.removeExtensionFromFile(file)
    try {
      const modulePath = pathToFileURL(
        path.join(routesPath, `${routeFile}.mjs`)
      ).href
      const module = await import(modulePath)
      router.use(`/${routeFile}`, module.default)
    } catch (err) {
      console.error(`Error loading route ${routeFile}:`, err)
    }
  }

  // Print all registered routes after loading
  const registeredRoutes = listRoutes(router)
}

// Load routes dynamically and wait for completion before starting server
loadRoutes().then(() => {
  /*
   * Setup routes for index
   */
  router.get('/', (req, res) => {
    res.render('index')
  })

  /*
   * Handle 404 error
   */
  router.use('*', (req, res) => {
    res.status(404).json({
      errors: {
        msg: 'URL_NOT_FOUND'
      }
    })
  })
})

export default router
