const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');

/**
 * Minify JS files.
 */
function minifyJs(cb) {
  gulp
    .src('src/assets/js/*.js')
    .pipe(uglify())
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

exports.default = gulp.series(minifyJs, minifyCss);
