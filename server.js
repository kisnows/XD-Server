const express = require('express')
const path = require('path')
const url = require('url')
const request = require('request')
const Freemarker = require('freemarker.js')
const config = require('./config')
const syncData = require('./data/sync.js')
const chalk = require('chalk')
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
    freemarker.render(filePath, data, function (err, html, output) {
      if (err) {
        // 没有卵用的 err ,即使编译错误也不会报错
        throw new Error('NOT', err)
      }
      // DONE 采用正则分析 output 的方法来判断是否出错,如果出错则直接输出到浏览器上
      if (/>>> ABORTED! <<</g.test(output)) {
        console.log(chalk.red('filePath render:' + output))
        res.send(output)
      } else {
        console.log(chalk.blue('filePath render:' + output))
        res.send(html)
      }
    })
  } else {
    next()
  }
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
