var gulp = require('gulp');
var del = require('del');
var replace = require('gulp-replace');
var vinylPaths = require('vinyl-paths');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var gulpif = require('gulp-if');
var useref = require('gulp-useref');
var less = require('gulp-less');
var autoprefixer  = require("gulp-autoprefixer");
var wkhtmltopdf = require('wkhtmltopdf');
var debug = require('gulp-debug');
var csso = require('gulp-csso');
var imageresize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


gulp.task('css', function () {

    del('src/css');
    del(['src/markdownForPdf/**/', '!src/markdownForPdf']);

    return gulp.src('layouts/partials/header.html')
        // concat css files        
        .pipe(useref())
        // .pipe(debug({title: 'useref:'}))
        // convert less to css
        .pipe(gulpif('*.css',less({ 
                strictMath: true 
        })))
        // add vendor prefixes
        .pipe(gulpif('*.css', autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        // compress css
        .pipe(gulpif('*.css', csso({
            restructure: true,
            sourceMap: false,
            debug: false
        })))
        // add revision to css file
        .pipe(gulpif('*.css', rev()))
        // replace into html file the name of css file with this revision.
        .pipe(revReplace())
        .pipe(gulpif('*.html', rename('header.concat.html')))
        .pipe(gulp.dest('layouts/partials'));

});

gulp.task('mv', function () {

    gulp.src(['dist/pages/index/index.html'])
        .pipe(gulp.dest('dist'));
    gulp.src(['dist/pages/prevention/index.html'])
        .pipe(gulp.dest('dist/prevention'));
    gulp.src(['dist/pages/recherche/index.html'])
        .pipe(gulp.dest('dist/recherche'));
    gulp.src(['dist/pages/formation/index.html'])
        .pipe(gulp.dest('dist/formation'));
    gulp.src(['dist/pages/contact/index.html'])
        .pipe(gulp.dest('dist/contact'));
    gulp.src(['dist/pages/adhesion/index.html'])
        .pipe(gulp.dest('dist/adhesion'));
    gulp.src(['dist/pages/qui-sommes-nous/index.html'])
        .pipe(gulp.dest('dist/qui-sommes-nous'));
        
    gulp.src(['dist-pdf/markdownForPdf/**'])
        .pipe(gulp.dest('dist/formation'));
});

gulp.task('clean', function () {

    del([
        'dist/pages',
        'dist-pdf/markdownForPdf/**',
        '!dist-pdf/markdownForPdf',
        'src/markdownForPdf/**',
        '!src/markdownForPdf',
        ]);
});

gulp.task('replace', function () {

    gulp.src(['dist/index.html'])
        .pipe(replace('href="../../src/css/combined', 'href="css/combined'))
        .pipe(replace('href="/pages/', 'href="'))
        .pipe(gulp.dest('dist'));

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

    gulp.src(['dist/contact/index.html'])
        .pipe(replace('href="../../src/css/combined', 'href="../css/combined'))
        .pipe(replace('href="/pages/index', 'href="../index.html'))
        .pipe(replace('href="/pages/', 'href="../'))
        .pipe(gulp.dest('dist/contact'));

    gulp.src(['dist/adhesion/index.html'])
        .pipe(replace('href="../../src/css/combined', 'href="../css/combined'))
        .pipe(replace('href="/pages/index', 'href="../index.html'))
        .pipe(replace('href="/pages/', 'href="../'))
        .pipe(gulp.dest('dist/adhesion'));

    gulp.src(['dist/qui-sommes-nous/index.html'])
        .pipe(replace('href="../../src/css/combined', 'href="../css/combined'))
        .pipe(replace('href="/pages/index', 'href="../index.html'))
        .pipe(replace('href="/pages/', 'href="../'))
        .pipe(gulp.dest('dist/qui-sommes-nous'));
});
