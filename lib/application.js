const http = require('http')
const url =  require('url')

const app = (req, res) => {
  const method = req.method.toLowerCase()
  const urlObj = url.parse(req.url, true)
  const pathname = urlObj.pathname
  const router = passRouter(method, pathname)
  router(req, res)
}

app.routes = []
const methods = ['get', 'post', 'put', 'delete', 'options', 'all']
methods.forEach(method => {
  app[method] = (path, callback) => {
    app.routes.push({ method, path, callback})
  }
})

const passRouter = (method, path) => {
  let callback
  for (let route of app.routes) {
    if ((route.path === path || route.path === '*') && (route.method === method || route.method === 'all')) {
      callback = route.callback
    }
  }
  if (!callback) {
    callback = (req, res) => {
      res.end(`cannot ${method} ${path}`)
    }
  }
  return callback
}

app.listen = function () {
  const server = http.createServer(app)
  return server.listen.apply(server, arguments)
}

module.exports = app