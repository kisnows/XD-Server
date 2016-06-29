/**
 * 引入此目录下所有其他的文件
 */
const fs = require('fs')
const path = require('path')
const data = {}
const importData = new Promise(function (resolve, reject) {
  fs.readdir(path.join(__dirname, '/'), function (err, files) {
    if (err) {
      reject(err)
    }
    files.forEach(function (file, index) {
      if(file === 'index.js') return
      file = file.replace(/\.js$/,'')
      data[file] = require(path.join(__dirname, '/', file))
    })
    resolve(data)
  })
})

importData.then(function (data) {
  module.exports = data
}).catch(function (err) {
  throw new Error(err)
})
