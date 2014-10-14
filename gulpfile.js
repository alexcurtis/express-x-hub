var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var libs = 'lib/**/*.js';
var tests = './test/*.js';

gulp.task('jshint', function() {
    return gulp.src(libs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('mocha', function () {
    return gulp.src(tests, { read: false })
        .pipe(mocha({
            globals: { env: require('./test/support/env') },
            reporter: 'dot'
        }));
});

gulp.task('build', ['jshint', 'mocha']);
gulp.task('default', ['build']);

gulp.task('watch', function(){
    gulp.watch([libs, tests], ['build']);
});
