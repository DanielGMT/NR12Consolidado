var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var del = require('del');
var concat = require('gulp-concat');
var server = require('gulp-develop-server');
var bs = require('browser-sync');
var reload = bs.reload;

var options = {
    server: {
        path: 'server.js',
        execArgv: [ '--harmony' ]
    },
    bs: {
        proxy: 'http://localhost:3000',
        port: 3001
    }
};

var serverFiles = ['server.js', './app/**/*.js', './config/*.js'];
var scripts = ['src/js/**/*.js'];
var excetojs = ['src/**/*', '!src/js/**/*'];

gulp.task('clean', function(){
	return del(['public/']);
});

gulp.task('server:start', ['excetojs','scripts'], function(){
	//server.listen(options.server);

	server.listen(options.server, function(error){
		if(!error) bs(options.bs);
	});
});

gulp.task('server:restart', function(){
	server.restart();

	/*server.restart(function(error){
		if(!error)
			bs.reload({stream: true});
	});*/
});

gulp.task('scripts', function() {
	return gulp
		.src(scripts)
		//.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('excetojs', function() {
	return gulp
		.src(excetojs)
		.pipe(gulp.dest('public'));
});

gulp.task('default', ['server:start'], function(){
	gulp.watch(serverFiles, ['server:restart']);
	gulp.watch(scripts, ['scripts']).on('change', reload);
	gulp.watch(excetojs,['excetojs']).on('change', reload);
});

gulp.task('watch', ['excetojs','scripts'], function(){
	gulp.watch(scripts, ['scripts']);
	gulp.watch(excetojs, ['excetojs']);
});
