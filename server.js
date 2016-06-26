"use strict"
const express = require('express')
const path = require('path')
const url = require('url')
const request = require('request')
const Freemarker = require('freemarker.js')
const config = require('./config')
const syncData = require('./data/sync.js')
const app = express()

const freemarker = new Freemarker({
    viewRoot: path.join(__dirname, 'views')
})

// 静态资源
app.use('static', express.static(path.join(__dirname, 'static')))

// 解析 ftl
app.use(function (req, res, next) {
    // var filePath = url.parse(req.originalUrl).pathname
    var filePath = req.path
    if (/\.ftl$/.test(filePath)) {
        var fileName = filePath.replace(/(\/|\.ftl)/g,'')
        var data = syncData['page_'+fileName] || {}
        var rawHtml = freemarker.renderSync(filePath,data)
        res.send(rawHtml)
    }else{
        res.sendFile(path.join(__dirname,filePath))
    }
})
app.use(function (err, req, res, next) {
    err.status = err.status || 500
    res.status(err.status)
    res.send(err.message)
})

const port = config.prot || 3000

app.listen(port, function () {
    console.log('App is running on port %s', port)
})
