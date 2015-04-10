var gulp    = require('gulp');
var jscs    = require('gulp-jscs');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var shell   = require('gulp-shell');


gulp.task('lint', function() {
  return gulp.src('reverse_words.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return gulp.src('reverse_words.js')
    .pipe(jscs());
});

gulp.task('small', function() {
  gulp.watch('*.js', ['jscs', 'lint']);
  gulp.watch('reverse_words.js', function(data) {
    gulp.src('reverse_words.js')
      .pipe(shell([
        'node reverse_words small | tee result.out',
      ]));
  });
});

gulp.task('large', function() {
  gulp.src('reverse_words.js')
    .pipe(shell([
      'node reverse_words large | tee result.out',
    ]));
});

gulp.task('default', ['small']);
