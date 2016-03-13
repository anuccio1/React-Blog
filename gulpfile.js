// gulpfile.js
 
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
 
gulp.task('build', function () {
  browserify({
    entries: 'public/js/app.js',
    extensions: ['.js'],
    debug: true
  })
  .transform("babelify", {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('public'));
});
 
gulp.task('default', ['build']);