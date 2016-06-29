const path = require('path')
const url = require('url')
const chalk = require('chalk')
const request = require('request')
const Freemarker = require('freemarker.js')
const express = require('express')

const config = require('./config')
const syncData = require('./data/sync.js')
const app = express()
const router = express.Router()


// 静态资源
app.use(express.static(path.join(__dirname, 'src')))

app.use(function(req,res,next){
  console.log(chalk.blue(req.method,req.url))
  next()
})

app.use('/', router);

app.use(function (err, req, res, next) {
  err.status = err.status || 500
  res.status(err.status)
  res.send(err.message)
})

require('./data')(router)

const port = 3008

app.listen(port, function () {
  console.log(chalk.yellow('App is running on port %s'), port)
})
