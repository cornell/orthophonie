var gulp = require('gulp');
var del = require('del');
var replace = require('gulp-replace');
var vinylPaths = require('vinyl-paths');
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
		//.pipe(gulpif('*.css', minifyCss()))
		.pipe(rev())                // Rename the concatenated files
		.pipe(assets.restore())	
		.pipe(useref())
		.pipe(revReplace())         // Substitute in new filenames
		.pipe(gulpif('*.html', rename('header.concat.html')))
		.pipe(gulp.dest('layouts/partials'));
	
});

gulp.task('mv', function(){
	
	gulp.src(['dist/pages/index/index.html'])
		.pipe(gulp.dest('dist'));
	gulp.src(['dist/pages/prevention/index.html'])
		.pipe(gulp.dest('dist/prevention'));
	gulp.src(['dist/pages/recherche/index.html'])
		.pipe(gulp.dest('dist/recherche'));
	gulp.src(['dist/pages/formation/index.html'])
		.pipe(gulp.dest('dist/formation'));		
	gulp.src(['dist/pages/a-propos/index.html'])
		.pipe(gulp.dest('dist/a-propos'));		
});

gulp.task('mv-clean', ['mv'], function(){
	
	del('dist/pages')
});

gulp.task('replace', function(){
  
	gulp.src(['dist/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="css/combined'))
		.pipe(replace('href="/pages/', 'href="'))
		.pipe(gulp.dest('dist'));

	gulp.src(['dist/posts/**/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="../../css/combined'))
		.pipe(replace('href="/pages/index', 'href="../../index.html'))
		.pipe(replace('href="/pages/', 'href="../../'))
		.pipe(gulp.dest('dist/posts'));
	
	gulp.src(['dist/formation/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="../css/combined'))
		.pipe(replace('href="/pages/index', 'href="../index.html'))
		.pipe(replace('href="/pages/', 'href="../'))
		.pipe(gulp.dest('dist/formation'));
		
	gulp.src(['dist/formation/**/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="../../css/combined'))
		.pipe(replace('href="/pages/index', 'href="../../index.html'))
		.pipe(replace('href="/pages/', 'href="../../'))
		.pipe(gulp.dest('dist/formation'));		
		
	gulp.src(['dist/recherche/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="../css/combined'))
		.pipe(replace('href="/pages/index', 'href="../index.html'))
		.pipe(replace('href="/pages/', 'href="../'))
		.pipe(gulp.dest('dist/recherche'));
		
	gulp.src(['dist/recherche/**/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="../../css/combined'))
		.pipe(replace('href="/pages/index', 'href="../../index.html'))
		.pipe(replace('href="/pages/', 'href="../../'))
		.pipe(gulp.dest('dist/recherche'));		
		
	gulp.src(['dist/prevention/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="../css/combined'))
		.pipe(replace('href="/pages/index', 'href="../index.html'))
		.pipe(replace('href="/pages/', 'href="../'))
		.pipe(gulp.dest('dist/prevention'));
		
	gulp.src(['dist/prevention/**/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="../../css/combined'))
		.pipe(replace('href="/pages/index', 'href="../../index.html'))
		.pipe(replace('href="/pages/', 'href="../../'))
		.pipe(gulp.dest('dist/prevention'));		
		
	gulp.src(['dist/a-propos/index.html'])
		.pipe(replace('href="../../src/css/combined', 'href="../css/combined'))
		.pipe(replace('href="/pages/index', 'href="../index.html'))
		.pipe(replace('href="/pages/', 'href="../'))
		.pipe(gulp.dest('dist/a-propos'));
});