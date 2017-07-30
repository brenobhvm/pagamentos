const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglyfycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const uglyfy = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets']);

gulp.task('app.html', function(){
	gulp.src('app/**/*.html')
		.pipe(htmlmin({collpseWhitespace: true}))
		.pipe(gulp.dest('public'));
});

gulp.task('app.css', function(){
	gulp.src('app/**/*.css')
		.pipe(uglyfycss({"uglyComments": true}))
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('public/assets/css'));
});

gulp.task('app.js', function(){
	gulp.src('app/**/*.js')
		.pipe(babel({presets: ['es2015']}))
		.pipe(uglyfy())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('public/assets/js'));
});

gulp.task('app.assets', function(){
	gulp.src('assets/**/*.*')
		.pipe(gulp.dest('public/assets'));
});