"use strict"

const express = require('express')
const path = require('path')
const url = require('url')
const request = require('request')
const Freemarker = require('freemarker.js')
const config = require('./config')
const syncData = require('./data/sync.js')
const app = express()
const router = express.Router()
const freemarker = new Freemarker({
  viewRoot: path.join(__dirname, config.viewRoot)
})


// 解析 ftl
app.use(function (req, res, next) {
  var filePath = req.path
  if (/\.ftl$/.test(filePath)) {
    var fileName = filePath.replace(/(\/|\.ftl)/g, '')
    var data = syncData['page_' + fileName] || {}
    var rawHtml = freemarker.renderSync(filePath, data)
    res.send(rawHtml)
  }
  next();
})

// 静态资源
app.use(express.static(path.join(__dirname, 'src')))
app.use('/', router);


app.use(function (err, req, res, next) {
  err.status = err.status || 500
  res.status(err.status)
  res.send(err.message)
})

if (process.env.NODE_ENV === 'development') {
  console.log('dev')
  require('./data')(router)
} else if (process.env.NODE_ENV === 'api') {
  router.use('/', function (req, res, next) {
    if (req.method.toUpperCase() === 'GET') {
      request({
        qs: req.body,
        method: req.method,
        url: 'http://' + process.env.REMOTE_API + req.url,
        headers: req.headers
      }).pipe(res);
    } else if (req.method.toUpperCase() === 'POST') {
      request({
        form: req.body,
        method: req.method,
        url: 'http://' + process.env.REMOTE_API + req.url,
        headers: req.headers
      }).pipe(res);
    }
  });
}

const port = config.port || 3000

app.listen(port, function () {
  console.log('App is running on port %s', port)
})
