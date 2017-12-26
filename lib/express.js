const http = require('http')

module.exports = function () {
  const app = http.createServer()
  return app
}