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
var pkg = require('./package')

var filepath = {
  'css': ',/src/css/**/*.css',
  'scss': './src/scss/**/*.scss',
  'js': './src/js/**/*.js',
  'views': './src/views/**/*.ftl'
}

gulp.task('css', function () {
  return gulp.src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(bs.stream())
});

gulp.task('develop', function () {
  nodemon({
    script: 'server.js',
    ignore: ['src', '.vscode', 'idea', 'node_modules'],
    env: {
      'NODE_ENV': 'development'
    }
  });
  bs.init(null, {
    proxy: 'http://localhost:3000',
    files: [filepath.js, filepath.views],
    notify: false,
    port: 5000
  })
});

gulp.task('watch', function () {
  gulp.watch(filepath.scss, ['css']);
});

//fot test
gulp.task('api', function () {
  nodemon({
    script: 'server.js',
    ignore: ['src', '.vscode', 'idea', 'node_modules'],
    env: {
      'NODE_ENV': 'api',
      'REMOTE_API': pkg.remoteApi
    }
  });
});

gulp.task('cssmin', function () {
  return gulp.src('static/app.css')
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('jsmin', function () {
  return gulp.src('static/app.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['develop', 'css', 'watch']);
gulp.task('build', ['cssmin', 'jsmin']);
