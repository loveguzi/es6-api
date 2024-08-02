/**
 * Middleware to trim all string properties in the request body, query, and params
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
 export const trimRequestMiddleware = (req, res, next) => {
  const trimStringProperties = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      } else if (typeof obj[key] === 'object') {
        obj[key] = trimStringProperties(obj[key]);
      }
    }

    return obj;
  };

  req.body = trimStringProperties(req.body);
  req.query = trimStringProperties(req.query);
  req.params = trimStringProperties(req.params);
  next();
};
