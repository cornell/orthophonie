var gulp = require('gulp');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var gulpif = require('gulp-if');
var useref = require('gulp-useref');
var minifyCss = require('gulp-minify-css');
    // uglify = require('gulp-uglify'),


gulp.task('default', function(){
	
	var assets = useref.assets();
	
	return gulp.src('layouts/partials/header.html')	
		.pipe(assets) // intègre les fichiers définis dans les blocs html dans le pipe
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(rev())                // Rename the concatenated files
		.pipe(assets.restore())		        		
		.pipe(useref())
		.pipe(revReplace())         // Substitute in new filenames
		.pipe(gulpif('*.html', rename('header.concat.html')))
		.pipe(gulp.dest('layouts/partials'));
	
});