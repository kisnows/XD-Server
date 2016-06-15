// Modules dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('css', function () {
  return gulp.src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static'));
});

gulp.task('js', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static'))
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('develop', function () {
  nodemon({
    script: 'server.js',
    ignore: ['src', 'static']
  });
});

gulp.task('cssmin', function () {
  return gulp.src('static/app.css')
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('static/build'));
});

gulp.task('jsmin', function () {
  return gulp.src('static/app.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('static/build'));
});

gulp.task('default', ['develop', 'css', 'js', 'watch']);
gulp.task('build', ['cssmin', 'jsmin']);
