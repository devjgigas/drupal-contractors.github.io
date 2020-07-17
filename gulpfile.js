var child = require('child_process');
var gulp = require('gulp');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var log = require('fancy-log');
var postcss = require('gulp-postcss');
var uncss = require('uncss').postcssPlugin;
var cssnano = require('cssnano');

gulp.task('js', () => {
  // Compile JS.
  return gulp.src([
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
  ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
})

gulp.task('js:watch', () => {
  gulp.watch('./_js/**/*.js', ['js']);
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build']);

  jekyll.stdout.on('data', logger('Jekyll', 'info'));
  jekyll.stderr.on('data', logger('Jekyll', 'error'));

  return jekyll;
});

gulp.task('jekyll:serve', () => {
  const jekyll = child.spawn('bundle', ['exec', 'jekyll', 'serve']);

  jekyll.stdout.on('data', logger('Jekyll', 'info'));
  jekyll.stderr.on('data', logger('Jekyll', 'error'));

  return jekyll;
});

var logger = (id, level) => buffer => {
  buffer.toString()
    .split(/\n/)
    .forEach((message) => log[level](id + ': ' + message));
};

gulp.task('default', gulp.series('js', 'jekyll:serve', 'js:watch'));

gulp.task('build', gulp.series('js', 'jekyll'));
