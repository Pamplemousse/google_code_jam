var _       = require('underscore');
var gulp    = require('gulp');
var jscs    = require('gulp-jscs');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var shell   = require('gulp-shell');
var foreach = require('gulp-foreach');

gulp.task('lint', function() {
  return gulp.src('reverse_words.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return gulp.src('reverse_words.js')
    .pipe(jscs());
});

gulp.task('dev', function() {
  // Some task to avoid stupid mistakes during development
  gulp.watch(
    ['Gulpfile.js', 'rounds/**/*.js'],
    ['jscs', 'lint']
  );
  // Here we go: live execution of the code
  gulp.watch('rounds/*/sources/*.js', ['small']);
});

// Execution of the code with corresponding input
//  * piped to the console
//  * piped to the corresponding result file
gulp.task('small', function() {
  gulp.src('rounds/*/sources/*.js')
    .pipe(foreach(function (stream, file) {
      var x = file.path.replace(/sources/, 'results');
      x = x.substr(0, x.length - 3);
      return stream.pipe(shell([
        'node ' + file.path + ' small | tee ' + x + '-small.out'
      ]));
    }));
});

// Execution of the code with corresponding input
//  * piped to the corresponding result file
gulp.task('large', function() {
  gulp.src('rounds/*/sources/*.js')
    .pipe(foreach(function (stream, file) {
      var x = file.path.replace(/sources/, 'results');
      x = x.substr(0, x.length - 3);
      return stream.pipe(shell([
        'node ' + file.path + ' large > ' + x + '-large.out'
      ]));
    }));
});

gulp.task('default', ['dev']);
