import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as utils from '../middleware/utils/index.mjs'

// ES 모듈에서 __dirname을 구현
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const modelsPath = `${__dirname}/`

export default () => {
  /*
   * Load models dynamically
   */

  // Loop models path and loads every file as a model except this file
  fs.readdirSync(modelsPath).filter((file) => {
    // Take filename and remove last part (extension)
    const modelFile = utils.removeExtensionFromFile(file)
    // Prevents loading of this file
    if (modelFile !== 'index') {
      import(`./${modelFile}.mjs`)
    }
  })
}
