'use strict';
var gulp = require('gulp'),
	connect = require('gulp-connect');

//watch
gulp.task('watch', function() {
	gulp.watch();
});

//connect create web server
gulp.task('connect', function(){
	connect.server({
		root: 'src',
		livereload: true
	});
});

//
gulp.task('html', function(){
	gulp.src(['./src/component/*/*/*.jsx']).
	pipe(connect.reload());
});

//run default taks of gulp
gulp.task('default', ['connect', 'watch']);