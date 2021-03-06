var gulp = require('gulp');
var vueify = require('vueify');
var browserify = require('gulp-browserify');
var minify = require('gulp-minify');
var util = require('gulp-util');
 
// Basic usage 
gulp.task('default', function() {
	process.env.NODE_ENV = 'production';

	gulp.src('catena.js')
	.pipe(browserify({
		insertGlobals : true,
		debug : !util.env.production,
		transform: [[{_flags: {debug: !util.env.production}}, vueify]]
	}))
	.pipe(minify({
		ext:{
			src:'-debug.js',
			min:'.js'
		},
	}))
    .pipe(gulp.dest('./build/'))
});

gulp.task('watch', function() {
	gulp.watch('./*.js', ['default']);
	gulp.watch('./components/*.js', ['default']);
	gulp.watch('./components/*.vue', ['default']);
});