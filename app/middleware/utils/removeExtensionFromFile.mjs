/**
 * Removes extension from file
 * @param {string} file - filename
 * @returns {string} filename without extension
 */
export const removeExtensionFromFile = (file) =>
  file.split('.').slice(0, -1).join('.').toString()
