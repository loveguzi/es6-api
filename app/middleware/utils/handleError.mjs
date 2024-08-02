/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {object} res - response object
 * @param {object} err - error object
 */
export const handleError = (res, err) => {
  // Prints error in console
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }
  // Sends error to user
  res.status(err.code || 500).json({
    errors: {
      msg: err.message || 'An unknown error occurred'
    }
  })
}
