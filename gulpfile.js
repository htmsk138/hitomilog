const gulp = require('gulp');
const terser = require('gulp-terser');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');

/**
 * Delete _site folder before build.
 */
function clearBuildFolder() {
  return del('_site');
}

/**
 * Minify JS files.
 */
function minifyJs(cb) {
  gulp
    .src('src/assets/js/*.js')
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('_site/assets/js/'));

  cb();
}

/**
 * Minify CSS files.
 */
function minifyCss(cb) {
  gulp
    .src('src/assets/css/*.css')
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('_site/assets/css/'));

  cb();
}

/**
 * Copy images for posts.
 */
function copyPostImages(cb) {
  gulp
    .src('src/posts/**/*.{png,jpg,gif,svg}', {
      encoding: false
    })
    .pipe(gulp.dest('_site'));

  gulp
    .src('src/ja/posts/**/*.{png,jpg,gif,svg}', {
      encoding: false
    })
    .pipe(gulp.dest('_site/ja'));

  cb();
}

exports.prod = gulp.series(clearBuildFolder, minifyJs, minifyCss, copyPostImages);
exports.dev = gulp.series(clearBuildFolder, copyPostImages);
