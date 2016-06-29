// Modules dependencies
var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync')
var bs = browserSync.create('My server')
var nodemon = require('gulp-nodemon')
var cssnano = require('gulp-cssnano')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var config = require('./config')
var path = require('path')

// path 定义
var basedir = './src/'
var filepath = {
  'css': path.join(basedir, 'css/**/*.css'),
  'scss': path.join(basedir, 'scss/**/*.scss'),
  'js': path.join(basedir, 'js/**/*.js'),
  'views': path.join(basedir, 'views/**/*.ftl')
}

// 编译 scss
// TODO: 是否需要为每个页面单独编译一个 css 文件出来
gulp.task('css', function () {
  return gulp.src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(bs.stream())
})

// dev server
// 启动 express 并添加 browserSync 支持
gulp.task('develop', function () {
  nodemon({
    script: 'server.js',
    ignore: ['src', '.vscode', 'idea', 'node_modules'],
    env: {
      'NODE_ENV': 'development'
    }
  })
  bs.init(null, {
    proxy: 'http://localhost:' + config.port,
    files: [filepath.js, filepath.views],
    notify: false,
    port: 5000
  })
})

gulp.task('watch', function () {
  gulp.watch(filepath.scss, ['css'])
})

// 联调服务
gulp.task('api', function () {
  nodemon({
    script: 'server.js',
    ignore: ['src', '.vscode', 'idea', 'node_modules'],
    env: {
      'NODE_ENV': 'api',
      'REMOTE_API': config.remoteApi
    }
  })
  bs.init(null, {
    proxy: 'http://localhost:' + config.port,
    files: [filepath.js, filepath.views],
    notify: false,
    port: 5000
  })
})

gulp.task('cssmin', function () {
  return gulp.src('static/app.css')
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('jsmin', function () {
  return gulp.src('static/app.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('build', ['cssmin', 'jsmin'])

gulp.task('default', ['develop', 'css', 'watch'])
