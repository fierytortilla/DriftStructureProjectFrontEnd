const configureAPI = require('../server')

module.exports = {
  devServer: {
    before: configureAPI
  }
}