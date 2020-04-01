var gulp = require('gulp'),
  settings = require('./settings'),
  webpack = require('webpack'),
  browserSync = require('browser-sync').create(),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  cleanCSS = require('gulp-clean-css'),
  postcssCustomProperties = require('postcss-custom-properties'),
  rename = require('gulp-rename');

gulp.task('styles', function() {
  return (
    gulp
      .src(settings.projectRoot + 'css/style.css')
      .pipe(
        postcss([
          cssImport,
          nested,
          postcssCustomProperties({
            preserve: true,
            importFrom: './css/properties.css',
          }),
          autoprefixer,
        ]),
      )
      // .pipe(sourcemaps.init())
      // .pipe(cleanCSS())
      // .pipe(sourcemaps.write())
      .on('error', error => console.log(error.toString()))
      .pipe(gulp.dest(settings.projectRoot + '/bundled/'))
  );
});

gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});

gulp.task('watch', function() {
  browserSync.init({
    notify: true,
    proxy: settings.urlToPreview,
    ghostMode: false,
  });

  gulp.watch(
    settings.projectRoot + 'css/**/*.css',
    gulp.parallel('waitForStyles'),
  );
  gulp.watch(
    [
      settings.projectRoot + 'js/components/*.js',
      settings.projectRoot + 'js/scripts.js',
    ],
    gulp.parallel('waitForScripts'),
  );
});

gulp.task(
  'waitForStyles',
  gulp.series('styles', function() {
    return gulp
      .src(settings.projectRoot + '/bundled/style.css', { allowEmpty: true })
      .pipe(browserSync.stream());
  }),
);

gulp.task(
  'waitForScripts',
  gulp.series('scripts', function(cb) {
    browserSync.reload();
    cb();
  }),
);
