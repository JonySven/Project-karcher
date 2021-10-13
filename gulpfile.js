const { src, dest, parallel, series, watch } = require ('gulp');

const bsy          = require('browser-sync');
const browserSync  = bsy.create;
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const less         = import('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = import('gulp-imagemin');
const newer        = import('gulp-newer');
const clean         = import('gulp-clean');

 

function browsersync() {
    bsy.init({
        server: { baseDir: 'src/' },
        notify: false,   // отменяет уведомления
        online: false    // для работы локально
    })
};

// gulp.task('clen', function(){
//     return gulp
//               .src('./build')
//               .pipe(clean())
//   });

function scripts() {
    return src('./src/script.js')
    .pipe(concat('script.min.js'))     //сжимает
    .pipe(uglify())                      
    .pipe(dest('./dist'))
          // для перезагрузки странице при изменении
};




function styles() {

    predprocessor = less

    return src('./src/style.less')
       
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'], grid: true }))
       
        .pipe(dest('./dist'))
   
};

function images() {
    return src('./src/img/**/*')
        .pipe(newer('./dist/img')) //для сравнения уже сжатого, что бы не пережимать
        .pipe(imagemin)     // сжимаем
        .pipe(dest('./dist/img'))

};

function nunj() {
    return src(['./src/index.nunj'])
              .pipe(nunj.compile())
              .pipe(dest('./src'))
  };


function html ()  {
    return  src('./src/index.html')
              .pipe(concat('index.min.html'))  // сжимаем
              .pipe(dest('./dist'))
  };
  

function buildcopy() {
    return src([
        './dist/script.min.js',
        './dist/styles.min.css',
        './dist/index.min.html',
        './dist/img/*'
        
    ], {base:'app'}) // добовляем папку из источника (если вложение было в src)
    .pipe(dest('./build'))
};



function startWatch() {
    watch('./src/index.nunj').on('change', bsy.reload)  // при изменении html обновляем страницу
    watch('./src/style.less',styles)
    watch('./src/*.js', scripts)  //следим за изменениями в файле
};


exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.html        = html;
exports.buildcopy   = buildcopy;
exports.nunj        = nunj;



exports.default = parallel(scripts, styles, buildcopy, browsersync, startWatch);

exports.build = series(nunj, html, buildcopy);