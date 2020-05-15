const gulp = require('gulp')
const postcss = require('gulp-postcss')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const browserSync = require('browser-sync').create()
const browserify = require('gulp-browserify')
const del = require('del')
const webpack = require('webpack')
const babelify = require('babelify')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')

// Config

const config = require('./buildConfig')

// Styles

gulp.task('styles', () => {
  return gulp
    .src(`${config.root}css/style.css`)
    .pipe(
      postcss([
        require('postcss-import'),
        require('postcss-nested'),
        require('autoprefixer'),
        require('postcss-csso'),
        require('postcss-custom-properties'),
      ]),
    )
    .pipe(rename(config.styleDestName))
    .pipe(gulp.dest(config.root + config.styleDestPath))
})

// Scripts

gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString())
    }

    console.log(stats.toString())
    callback()
  })
})

// Images

gulp.task('images', () => {
  return gulp
    .src(config.root + config.imagesPath)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ]),
    )
    .pipe(gulp.dest(config.root + config.imagesPath))
})

// Clean

gulp.task('clean', () => {
  return del(['_site'])
})

// Watch

gulp.task('watch', function() {
  browserSync.init({
    notify: true,
    proxy: `localhost:${config.port}`,
  })

  gulp.watch(`${config.root}css/**/*.css`, gulp.series('waitForStyles'))
  gulp.watch(`${config.root}js/**/*.js`, gulp.series('waitForScripts'))
})

gulp.task(
  'waitForStyles',
  gulp.series('styles', () => {
    return gulp
      .src(config.root + config.styleDestPath + config.styleDestName)
      .pipe(browserSync.stream())
  }),
)
gulp.task(
  'waitForScripts',
  gulp.series('scripts', cb => {
    browserSync.reload()
    cb()
  }),
)
