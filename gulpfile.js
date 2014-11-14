var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');

gulp.task('default', function() {
    gulp.start('stylus');
    gulp.start('jade');
    gulp.start('scripts');
    gulp.start('serve');
});

gulp.task('stylus', function() {
    return gulp.src('src/styles/style.styl')
	.pipe(stylus())
	.pipe(gulp.dest('./build/css'))
	.pipe(reload({stream: true}));
});

gulp.task('jade', function() {
    return gulp.src('src/index.jade')
	.pipe(jade())
	.pipe(gulp.dest('./build'))
	.pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src(['src/js/vendor/*.js', 'src/js/plugins/*.js', 'src/js/main.js'])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('./build/js'));
});

gulp.task('serve', function() {
    browserSync({
	server: {
	    baseDir: 'build/',
	},
	port: 3001
    });

    gulp.watch('src/**/*.jade', ['jade']);
    gulp.watch('src/styles/**/*.styl', ['stylus']);
    gulp.watch('src/js/**/*.js', ['scripts'], function() {
	reload();
    });
});
