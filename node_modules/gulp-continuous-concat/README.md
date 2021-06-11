## Information

<table>
<tr> 
<td>Package</td><td>gulp-continuous-concat</td>
</tr>
<tr>
<td>Description</td>
<td>Continuously concatenates files</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Usage

```javascript
var watch = require('gulp-watch');
var concat = require('gulp-continuous-concat');

gulp.task('scripts', function() {
  gulp.src('./lib/*.js')
    .pipe(watch({glob: './lib/*.js'}))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});
```

This will continously concat files by your operating systems newLine. This differs from the standard `gulp-concat` plugin in that it does not require previous streams to emit an `end` to work. The typical use case for this plugin is after using `gulp-watch`, which does not emit an `end`. This prevents normal `gulp-concat` from ever finishing. Using the above example with standard `gulp-concat`, the concatenated file would never be created:

```javascript
var watch = require('gulp-watch');
var concat = require('gulp-concat');   // <-- standard gulp-concat

gulp.task('scripts', function() {
  gulp.src('./lib/*.js')
    .pipe(watch({glob: './lib/*.js'})) // <-- will never emit 'end'
    .pipe(concat('all.js'))            // <-- sits around forever, waiting for 'end'
    .pipe(gulp.dest('./dist/'))
});
```

`gulp-continuous-concat` gets around this by rebuilding the destination file on every incoming file. To avoid excessive rebuilding (for example, when first running the command on several files), it debounces the build step so it will only run after 100ms of not being called (the debouncing period is configurable via the `debounce` option on the options hash).

Files will be concatenated in the order that they are supplied, and will maintain that order even if one of those files is later re-emitted from upstream. For example, to concat `./lib/file3.js`, `./lib/file1.js` and `./lib/file2.js` in that order, the following code would create a task to do that:

```javascript
var concat = require('gulp-continuous-concat');

gulp.task('scripts', function() {
  gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])  // <-- emits the files in order
    .pipe(watch())                                                  // <-- later, ./lib/file1.js changes and re-emitted from here
    .pipe(concat('all.js'))                                         // <-- continuous-concat maintains the original gulp.src order
    .pipe(gulp.dest('./dist/'))
});
```

## Limitations

Because `gulp-watch` [does not emit files that were deleted](https://github.com/floatdrop/gulp-watch/issues/5), if you add a continuous concat step after a `gulp-watch`, and then delete a file, it will not be removed from the concatentated result.

If and when `gulp-watch` adds this functionality, this plugin could be updated to remove deleted files from the result.

## LICENSE

Apache 2.0 (See LICENSE file for full details)
