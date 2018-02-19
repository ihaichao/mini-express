const express = require('../index')
// const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.end('hello express')
})

// app.use((req, res, next) => {
//   console.log('this is middleware1')
//   next()
// })

app.listen(3000, function (req, res) {
  console.log('server is listening port 3000')
})