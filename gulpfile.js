const gulp = require('gulp')
const postcss = require('gulp-postcss')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const browserSync = require('browser-sync').create()
const browserify = require('gulp-browserify')
const del = require('del')
const rename = require('gulp-rename')

// Config

const config = {
  root: './',
  port: 4000,
  stylesSrc: 'css/style.css',
  styleDestName: 'style.css',
  styleDestPath: 'bundled',
  jsSrc: 'js/scripts.js',
  jsDistPath: 'bundled',
  jsDistName: 'scripts.js',
}

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

gulp.task('scripts', () => {
  return gulp
    .src(config.jsSrc)
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(browserify())
    .pipe(terser())
    .pipe(rename(config.jsDistName))
    .pipe(gulp.dest(config.jsDistPath))
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
  gulp.series('styles', function() {
    return gulp
      .src(config.styleDestPath + '/' + config.styleDestName)
      .pipe(browserSync.stream())
  }),
)
gulp.task(
  'waitForScripts',
  gulp.series('scripts', function() {
    return gulp
      .src(config.jsDistPath + '/' + config.jsDistName, { allowEmpty: true })
      .pipe(browserSync.stream())
  }),
)
