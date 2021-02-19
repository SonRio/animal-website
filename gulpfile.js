// SET DEFAULT BROWSER
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const { series, parallel } = require('gulp')
// JS AND CSS MODIFILE



// INCLUDE HTML
const htmlImport = require('gulp-html-import');
function IPHTML() {
    gulp.src('./app/*.html')
        .pipe(htmlImport('./app/components/'))
        .pipe(gulp.dest('dist')); 
};

// INCLUDE CSS
const concat = require('gulp-concat-css');
const cssnano = require('gulp-cssnano');
function CSS() {
    return gulp.src('app/css/*.css') 
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
}

// INCLUDE JS
const concatJS = require('gulp-concat');
function JS() {
  return gulp.src('app/js/*.js') 
  .pipe(concatJS('common.js'))
  .pipe(gulp.dest('dist/js'))
}

// IMG
const image = require('gulp-image');
const cache = require('gulp-cache');
function IMG() {
  return gulp.src('app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(image({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/assets/images'))
}

// Do everything once!
function build(){
    browserSync.init({
        server: {
          baseDir: 'dist',
        },
    })
    // HTML
    gulp.watch("app/components/*.html").on('change', browserSync.reload);
    gulp.watch("app/components/*.html").on('change', IPHTML);

    // CSS
    gulp.watch("app/css/*.css").on('change', browserSync.reload);
    gulp.watch("app/css/*.css").on('change', CSS);

    // JS
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
    gulp.watch("app/js/*.js").on('change', JS);

    // IMAGES
    gulp.watch("app/images/**/*.+(png|jpg|jpeg|gif|svg)").on('change', browserSync.reload);
    gulp.watch("app/images/**/*.+(png|jpg|jpeg|gif|svg)").on('change', IMG);
}

exports.default =  parallel(IPHTML,IMG, JS, CSS,build);

  