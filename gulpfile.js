/**
 * Created by yhwang131 on 2016-07-06.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var browserSync = require('browser-sync').create();

var compPath = 'public/bower_components/';

gulp.task('hello', function(){
    return console.log('Hello World~');
});

// 서버실행 (use browserSync module) : https://browsersync.io/docs/options/
gulp.task('server', ['uglify','minifyHtml'], function(){
    return browserSync.init({
        server : {
            baseDir: 'public/dist'
        }
    });
});

// js파일 minify
gulp.task('uglify', ['fwUglify'], function(){
   return gulp.src('public/src/js/*.js')   // src 디렉터리 아래 모든 js 파일을
       .pipe(concat('main.js'))             // 파일 병합
       .pipe(uglify())                      // minify 
       .pipe(gulp.dest('public/dist/js'))   // dist.js 디렉터리에 저장
       .pipe(browserSync.reload({stream:true}));    // broswerSync로 브라우저 반영
});

// framework파일 minify
gulp.task('fwUglify', function(){
    return gulp.src([compPath+'jquery/dist/jquery.min.js', compPath+'react/react*.min.js', compPath+'angular/angular.min.js'])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'))
        .pipe(browserSync.reload({stream:true}));
});

// html minify
gulp.task('minifyHtml', function(){
    return gulp.src('public/src/*.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('public/dist'))
        .pipe(browserSync.reload({stream:true}));
});

// 파일 변경 감지
gulp.task('watch', function(){
    gulp.watch('public/src/js/*.js', ['uglify']);    // 변경을 감지할 디렉터리, 변경을 감지 후 수행할 작업
    gulp.watch('public/src/*.html', ['minifyHtml']);
});

gulp.task('default',['hello', 'server', 'watch']);