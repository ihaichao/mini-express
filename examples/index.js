const express = require('../index')
// const express = require('express')
const app = express()

// app.get('/', function(req, res) {
//   res.end('You send GET request')
// })

// app.post('/', function(req, res) {
//   res.end('You send POST request')
// })

// app.use((req, res, next) => {
//   console.log('this is middleware1')
//   next()
// })

app.listen(3000, function (req, res) {
  console.log('server is listening 3000')
})