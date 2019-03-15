var gulp 		 = require('gulp');
	pug 		 = require('gulp-pug');
	stylus 	 = require('gulp-stylus');
	cssmin	 = require('gulp-clean-css');
	plumber	 = require('gulp-plumber');
	rename 	 = require('gulp-rename');
	connect      = require('gulp-connect'),
	watch		 = require('gulp-watch');
	browserSync  = require('browser-sync');
	sourcemaps 	 = require('gulp-sourcemaps');
	autoprefixer = require('autoprefixer-stylus');
	// uglifyjs		 = require('gulp-uglifyjs');
	imagemin 	 = require('gulp-imagemin');
	pngquant 	 = require('imagemin-pngquant');

// Path file
var path = {
	build: {
		pug: './',
		stylus: './dist/css/',
		img: './dist/img/',
		js: './dist/js/',
		fonts: './dist/fonts/'
	},
	src: {
		pug: './app/pug/**/*.pug',
		stylus: './app/styl/**.styl',
		img: './app/img/*.*',
		js: './app/js/*.js',
		fonts: './app/fonts/*.*'
	},
	watch: {
		pug: './app/pug/*.pug',
		stylus: './app/styl/*.styl',
		img: './app/img/*.*',
		js: './app/js/*.js',
		fonts: './app/fonts/*.*'
	}
};

// Start server localhost:
gulp.task('connect', function() {
	connect.server ({
		root: '',
		port: 3006
	});
});

// Start browserSync:
gulp.task('browser-sync', function() {
	browserSync ({
		server: {
			baseDir: './',
			notify: false
		},
		port: 3006,
		open: true,
	});
});

// fonts Build
gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

// Pug Build:
gulp.task('pug:build', function buildHTML() {
	return gulp.src(path.src.pug)
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(pug({
		pretty: true,
		baseDir: 'app/pug'
	}))
	.pipe(gulp.dest(path.build.pug))
	.pipe(browserSync.reload({
		stream:true
	}))
});

// Stylus Build:
gulp.task('stylus:build', function() {
	gulp.src(path.src.stylus)
		.pipe(sourcemaps.init())
		.pipe(stylus({
			compress: false,
			'include css': true,
			'use': [autoprefixer ({ browsers: ['last 5 versions'] })],
		}))
		.pipe(gulp.dest(path.build.stylus))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// JSBuild:
gulp.task('js:build', function() {
	gulp.src(path.src.js)
	// .pipe(uglify())
	.pipe(gulp.dest(path.build.js))
});

// IMG Build
gulp.task('image:build', function() {
	gulp.src(path.src.img)
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 7
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(browserSync.reload({
			stream:true
		}))
});

// All build
gulp.task('build', [
	'pug:build',
	'js:build',
	'stylus:build',
	'image:build',
	'fonts:build'
]);

// Watch files
gulp.task('watch', function() {
	watch([path.watch.pug], function(event, cb) {
		gulp.start('pug:build', browserSync.reload);
	});
	watch([path.watch.stylus], function(event, cb) {
		gulp.start('stylus:build', browserSync.reload);
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build', browserSync.reload);
	});
	watch(['../img/*'], function(events, cb) {
		gulp.start('image:build', browserSync.reload);
	});
	watch([path.watch.fonts], function (event, cb) {
		gulp.start('fonts:build', browserSync.reload);
	});
});

// Default task
gulp.task('start', ['connect', 'build', 'browser-sync', 'watch']);
