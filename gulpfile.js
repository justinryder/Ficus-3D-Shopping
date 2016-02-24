'use strict';

var gulp = require('gulp'),
    compass = require('gulp-compass'),
    // sass = require('gulp-sass'),
    mergeStream = require('merge-stream')

/**
* build tasks
*/

function buildCss() {
  return gulp.src('./src/sass/**/*.scss')
      .pipe(compass({
        css: './app/css',
        sass: './src/sass',
        image: './src/img'
      }))
      .pipe(gulp.dest('./app/css'));

  // return gulp.src('./src/sass/**/*.scss')
  //   .pipe(sass({
  //         includePaths: [
  //           'node_modules/compass-mixins/lib'
  //         ]
  //       }).on('error', sass.logError))
  //   .pipe(gulp.dest('./app/css'))
}

gulp.task('build:css', buildCss)

function buildHtml() {
  return gulp.src('./src/html/**/*.html')
    .pipe(gulp.dest('./app'))
}

gulp.task('build:html', buildHtml)

function buildImg() {
  return gulp.src('./src/img/**/*')
  .pipe(gulp.dest('./app/img'))
}

gulp.task('build:img', buildImg)

function buildJs() {
  return gulp.src([
    './src/js/**/*.js',
    './node_modules/three/three.js'
  ])
    .pipe(gulp.dest('./app/js'))
}

gulp.task('build:js', buildJs)

function buildObj() {
  return gulp.src('./src/obj/**/*')
  .pipe(gulp.dest('./app/obj'))
}

gulp.task('build:obj', buildObj)

gulp.task('build', function () {
  return mergeStream(
    buildCss(),
    buildHtml(),
    buildImg(),
    buildJs(),
    buildObj())
});

/**
* watch tasks
*/

function watchCss() {
  gulp.watch('./src/sass/**/*.scss', ['build:css'])
}

gulp.task('watch:css', watchCss)

function watchHtml() {
  gulp.watch('./src/**/*.html', ['build:html'])
}

gulp.task('watch:html', watchHtml)

function watchImg() {
  gulp.watch('./src/img/**/*', ['build:img'])
}

gulp.task('watch:img', watchImg)

function watchJs() {
  gulp.watch('./src/js/**/*.js', ['build:js'])
}

gulp.task('watch:js', watchJs)

function watchObj() {
  gulp.watch('./src/obj/**/*', ['build:obj'])
}

gulp.task('watch:obj', watchObj)

gulp.task('watch', function () {
  watchCss()
  watchHtml()
  watchImg()
  watchJs()
  watchObj()
})

/**
* default task
*/

gulp.task('default', ['build'])
