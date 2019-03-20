//Sassコンパイル
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require("gulp-plumber");
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');


const path = {
      base:'./src/',
      scss:'./src/scss/**/*.scss',
     image:'./src/assets/images/**/*',
        js:'./src/assets/js/**/*.js',
       css:'./src/assets/css',
 css_files:'./src/assets/css/**/*.css',
      html:'./src/**/*.html',
       php:'./src/**/*.php'
};

gulp.task('sass', function(){
    return gulp.src(path.scss)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "失敗してるよ！",
        message: "<%= error.message %>"
        })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded',
    }))
    .pipe(autoprefixer({
        browsers: ["last 2 versions", "Firefox ESR"],
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(path.css))
    .pipe(filter(['**', '!**/*.map']))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('server', function () {
    browserSync({
        notify: false,
        proxy: "http://localhost.base.tetau.jp/"
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('watch', function() {
  gulp.watch(path.scss, gulp.series('sass'));
  gulp.watch(path.php, gulp.series('reload'));
});

gulp.task('default',
    gulp.parallel('server','watch')
);






// deploy
const destDir = 'public_html/'; // Minify出力用ディレクトリ

gulp.task('filecopy', function() {
    return gulp.src([
        'src/**/*',
        '!src/_**/*',
        '!src/**/_*',
        // '!src/scss**/*',
        // '!src/assets/js/_**/*',
        // '!src/assets/js/**/*.js',
        // '!src/assets/css/_**/*',
        // '!src/assets/css/**/*.css',
        // '!src/assets/images/**/*'
    ])
    .pipe(gulp.dest(destDir));
});

gulp.task('deploy',
    gulp.parallel('filecopy')
);

