const gulp = require('gulp');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');
const connect = require('gulp-connect-pm2');

gulp.task('server', ['watch'], function(){
	gulp.src('public').pipe(webserver({
		host: '0.0.0.0',
		livereload: true, 
		//{
			//port: 3003,
			//markupHost: '162.243.167.154'
		//},
		port: 80,
		open: true
	}))
});

gulp.task('serverProd', function() {
  connect.server({
		root: 'public',
    port: 80
  });
  // run some headless tests with phantomjs
  // when process exits:
  //connect.serverClose();
});

gulp.task('watch', function(){
	watch('app/**/*.html', () => gulp.start('app.html'));
	watch('app/**/*.css', () => gulp.start('app.css'));
	watch('app/**/*.js', () => gulp.start('app.js'));
	watch('app/**/*.*', () => gulp.start('app.assets'));
});