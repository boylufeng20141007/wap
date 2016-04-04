'use strict';
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css');

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

gulp.task('iconfont', function(){
	gulp.src('src/base/svg/*.svg')
		.pipe(iconfontCss({
			fontName: 'icomoon',
			path: 'src/base/template/_font.scss',
			targetPath: '../../scss/mod/_font.scss',
			fontPath: '../../css/font/'
		}))
		.pipe(iconfont({
			fontName: 'icomoon',
			fontHeight: 1024,
			formats: ['ttf', 'eot', 'woff', 'svg']
		}))
		.pipe(gulp.dest('src/base/css/font/'));
});

//run default taks of gulp
gulp.task('default', ['connect', 'watch']);