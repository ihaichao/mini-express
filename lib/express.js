const http = require('http')

module.exports = function () {
  const app = {}
  app.listen = (port, host, callback) => {
    http.createServer(port, host)
  }
}