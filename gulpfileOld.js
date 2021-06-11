var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var del = require('del');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;
var server = require('gulp-develop-server');
var bs = require('browser-sync');

var options = {
    server: {
        path: 'server.js',
        execArgv: [ '--harmony' ]
    },
    bs: {
        proxy: 'http://localhost:4000'
    }
};

var serverFiles = [
    'server.js',
    './app/**/*.js'
];

gulp.task('server:start', function(){
	server.listen(options.server, function(error){
		if(!error) bs(options.bs);
	});
});

gulp.task('server:restart', function(){
	server.restart(function(error){
		if(!error) bs.reload({stream: true});
	});
});

gulp.task('clean', function(){
	return del(['public/']);
});

gulp.task('scripts', function() {
	return gulp
		.src(['src/js/**/*.js'])
		//.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('excetojs', function() {
	return gulp
		.src(['src/**/*','!src/js/**/*'])
		.pipe(gulp.dest('public'));

});

gulp.task('watch', function() {
	watcherJS.on("change",function(file){
		console.log(file);
	});
});

gulp.task('default', [
	'server:start',
	'excetojs',
	'scripts',
  'server:restart'
], function(){
	var watcherResources = gulp.watch(['src/**/*','!src/**/*.js'],['excetojs','server:restart']);
	var watcherJS = gulp.watch(['src/**/*.js'],['scripts','server:restart']);
	var serverFiless = gulp.watch(serverFiles, ['server:restart']);
});

gulp.task('rebuild', [
	'excetojs',
	'scripts'
]);
