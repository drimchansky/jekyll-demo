const gulp = require('gulp')
const postcss = require('gulp-postcss')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const browserSync = require('browser-sync').create()
const include = require('gulp-include')
const print = require('gulp-print')
const del = require('del')
const rev = require('gulp-rev')
const revRewrite = require('gulp-rev-rewrite')
const paths = require('vinyl-paths')

// Styles

gulp.task('styles', () => {
  return gulp
    .src('css/style.css')
    .pipe(
      postcss([
        require('postcss-import'),
        require('postcss-nested'),
        require('autoprefixer'),
        require('postcss-csso'),
        require('postcss-custom-properties'),
      ]),
    )
    .pipe(gulp.dest('bundled'))
})

// Scripts

// gulp.task('scripts', () => {
//   return gulp
//     .src('js/scripts.js')
//     .pipe(
//       babel({
//         presets: ['@babel/preset-env'],
//       }),
//     )
//     .pipe(include())
//     .on('error', console.log)
//     .pipe(terser())
//     .pipe(gulp.dest('bundled'))
// })

// Build

// gulp.task('build', gulp.series('styles', 'scripts'))

// Watch

gulp.task('watch', function() {
  browserSync.init({
    notify: true,
    proxy: 'localhost:4000',
  })

  gulp.watch('./css/**/*.css', gulp.series('waitForStyles'))
  // gulp.watch('./js/**/*.js', gulp.series('scripts'))
})

// gulp.task('waitForStyles', ['styles'], function(done) {
//   browserSync.reload()
//   done()
// })

gulp.task(
  'waitForStyles',
  gulp.series('styles', function() {
    return gulp.src('bundled/style.css').pipe(browserSync.stream())
  }),
)
