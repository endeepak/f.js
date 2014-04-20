var gulp = require('gulp');

var karma = require('gulp-karma');

var files = ['src/*.js', 'test/*.js'];

gulp.task('test', function() {
  return gulp.src(files)
  	.pipe(karma({configFile: 'karma.conf.js', action: 'run'}))
    .on('error', function(err) { throw err; });
});

gulp.task('watch', function() {
  return gulp.src(files)
  	.pipe(karma({configFile: 'karma.conf.js', action: 'watch'}))
});

gulp.task('default', ['test']);