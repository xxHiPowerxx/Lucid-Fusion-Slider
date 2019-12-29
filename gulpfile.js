'use strict'

var gulp = require('gulp')
var newer = require('gulp-newer');
var sass = require('gulp-sass')
var cssnano = require('gulp-cssnano')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')

// Styles/CSS
gulp.task('styles', function() {

	gulp
		.src([
			'./src/sass/**/*.scss',
			'!src/sass/import/', //exclude import'
      '!src/sass/import/**/*',
		])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(cssnano({
			discardComments: {removeAll: true}
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./assets/styles/'));
})

// Scripts/JS
gulp.task('scripts', function() {
	gulp
		.src([
			'./src/js/**/*.js',
			'!src/js/import/', //exclude import'
			'!src/js/import/**/*',
		])
		.pipe(uglify())
		.pipe(gulp.dest('./assets/scripts/'));
})

// Images
var imgDest = './assets/images/';
gulp.task('images', function(event) {
	gulp
		.src('./src/img/**/*')
		.pipe(newer(imgDest))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDest));
})


gulp.task('watch', function() {
	gulp.watch(
		[
			'./src/sass/**/*.scss',
			'./src/js/**/*.js',
			'./src/img/**/*',
		],
		gulp.parallel('styles', 'scripts', 'images')
	)
})
gulp.task('build', function(done) {
	gulp.parallel('styles', 'scripts', 'images')
	done()
})