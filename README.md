# XD-Server
一套前端开发环境，提供 ftl 模版解析、scss 编译、数据模拟等功能。基于 `express` 和 `gulp` 搭建。
## 环境需求：

* Node.js 4.4.5+
* glup 3.9.1+

## 配置
### express 配置
用以配置 `express` 的端口和要解析 `ftl` 文件的路径，配置文件位于 `config.js` 下：
```javascript
module.exports = {
  // ftl 文件地址
  'viewRoot': 'src/views',
  // express 端口号
  'port': 3000
}
```
### ftl 渲染
ftl 文件需要的数据在 `./data/sync.js` 下面定义，格式如下：
```javascript
//现在有两个页面，文件名分别为:home,list, 则他们对应的数据定义如下
module.exports = {
    //page_home 添加 page_ 前戳以防止文件重名
    'page_home': {
        'user': {
            'name': 'Yuanqi'
        }
    },
    'page_list': {
        'user': {
            'name': 'Yuanqi',
            'age':'23',
            'avatar':'../image/invalid_loan_img.png'
        }
    }
}
```
### mock 数据
mock 数据位于 `data/async.js`, 格式如下：
```javascript
//key 为接口名，
module.exports = {
    '/loan/index': {
        'name': 'XiaoDia',
    },
    '/loan/po': {
      'pro': 'haha'
    }
}
```
如果接口数据过多，不方便单独放在一个文件里面维护，也可以考虑按页面存放在 `page` 目录下，随后只需要在 `async.js` 里面引入 `./page` 这一个文件就可以了,不需要单独引入每一个文件。
### 启动
进入到项目地址下，然后
```bash
npm install && gulp
```
浏览器会自动打开到 `localhost:5000` 这个地址，默认以 `src` 为基础目录，在这个例子下面打开 `localhost:5000\home.ftl`，就可以开发了。

所有的流程都是自动化的，包括 scss 编译以及页面或者 js 的变动，都会实施反映到浏览器中。

## TODO
* [*] freemarker 编译错误抛出到浏览器
* []  远程联调
  - [] 同步联调
  - [*] 异步联调
* []  webpack 支持
