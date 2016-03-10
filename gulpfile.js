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
var less = require('gulp-less');
var autoprefixer  = require("gulp-autoprefixer");
var html2pdf = require('gulp-html2pdf');
var wkhtmltopdf = require('wkhtmltopdf');
var debug = require('gulp-debug');
// uglify = require('gulp-uglify'),


// gulp.task('copy', function () {
// 
//     del('src/content/posts/*.*');
// 
//     gulp.src([
//         'src/content/formation/*.md',
//         'src/content/prevention/*.md',
//         'src/content/recherche/*.md'
//     ])
//         .pipe(gulp.dest('src/content/posts'));
// });

gulp.task('default', function () {

    // var assets = useref.assets();

    del('src/css');
    del(['src/markdownForPdf/**/', '!src/markdownForPdf']);

    return gulp.src('layouts/partials/header.html')        
        .pipe(useref())
        .pipe(debug({title: 'useref:'}))
        .pipe(gulpif('*.css',less({ 
                strictMath: true 
        })))
        .pipe(gulpif('*.css', autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        .pipe(gulpif('*.css', rev()))
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
});

gulp.task('html2pdf', function(){
   
    // création des contrats de formation en PDF
    gulp.src(['dist-pdf/markdownForPdf/**/*.html'])
        //.pipe(html2pdf())
        .pipe(gulp.dest('dist/formation'));
    
    // wkhtmltopdf("C:\Projets\orthophonie\dist-pdf\markdownForPdf\le-bilan-et-la-reeducation-vocale-le-timbre-en-question\contrat-formation-dpc.html")
});


function plugin(options) {
    options = options || {};

    return function (files, metalsmith, done) {
        setImmediate(done);
        
        
    //     Object.keys(files).forEach(function (file) {
    //         
    //         console.log(file);
    //         // debug('checking file: %s', file);
    //         //   if (!markdown(file)) return;
    //         // if (file !== '') return;
    //         
    //         // var fileObj = path.parse(file)
    //         // var fileData = files[file];
    //         // // récupérer que les fichiers de type formation
    //         // if (fileData.axe !== 'formation') return;
    //         //  console.log(fileData);
    // 
    //     });
    };
}

gulp.task('clean', function () {

    del([
        'dist/pages',
        //'dist-pdf',
        // 'src/content/posts/**',
        // '!src/content/posts'
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
