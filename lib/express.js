const http = require('http')
const url =  require('url')

const app = (req, res, next) => {
  const method = req.method.toLowerCase()
  const urlObj = url.parse(req.url, true)
  const pathname = urlObj.pathname
  const router = traverseRouter(method, pathname)
  router(req, res)

  let i = 0
  function next () {
    const handler = app.middlewares[i++]
    if (!handler) return
    handler(req, res, next)
  }
  next()
}

app.routes = []
app.middlewares = []

const methods = ['get', 'post', 'put', 'delete', 'options', 'all']
methods.forEach(method => {
  app[method] = (path, handler) => {
    app.routes.push({method, path, handler})
  }
})

/**
 * 遍历路由
 */
const traverseRouter = (method, path) => {
  let handler
  for (let route of app.routes) {
    if ((route.path === path || route.path === '*') && (route.method === method || route.method === 'all')) {
      handler = route.handler
    }
  }
  if (!handler) {
    handler = (req, res) => {
      res.end(`cannot ${method} ${path}`)
    }
  }
  return handler
}

app.use = function (handler) {
  app.middlewares.push(handler)
}

app.listen = function () {
  const server = http.createServer(app)
  return server.listen.apply(server, arguments)
}

const createApplication = () => app

module.exports = createApplication