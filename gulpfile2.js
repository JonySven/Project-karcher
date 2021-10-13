const gulp     = require('gulp');
const gulpLess = require('gulp-less');
const gulpCsso = require('gulp-csso');
const gulpJs   = require('gulp-uglify');
const htmlMin  = require('gulp-htmlmin');
const clean    = require('gulp-clean');
const nunj     = require('gulp-nunjucks');

const browserSync = require(' browser-sync').create();

gulp.task('clean', function(){
  return gulp
            .src('./build')
            .pipe(clean())
});


gulp.task("styles", function(){
  return gulp
            .src("./src/style.less")
            .pipe(gulpLess())
            .pipe(gulpCsso())

            .pipe(gulp.dest('./build/css'))


});

gulp.task("scripts", function() {
  return gulp
    .src('./src/*.js')
    .pipe(gulpJs())
    .pipe(gulp.dest('./build/js'))
});

gulp.task("nunj", function() {
  return gulp
            .src(['./src/index.nunj'])
            .pipe(nunj.compile())
            .pipe(gulp.dest('./src'))
});

gulp.task("html", function() {
  return gulp
            .src('./src/index.html')
            .pipe(htmlMin({ collapseWhitespace: true }))
            .pipe(gulp.dest('./build'))
});

gulp.task("img", function() {
  return gulp
            .src('./src/img/**')
            .pipe(gulp.dest('./build/img'))
});




exports.default = gulp.series('styles', 'scripts', 'nunj', 'html', 'img');

exports.browsersync = browsersync;