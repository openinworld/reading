const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const autoPrefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'));
/*
//gulp@3的书写方法
gulp.task('cssHandler', function() {
    return gulp
        .src('./src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
})*/
//gulp@4的书写方法  需要导出
const cssHandler = function() {
        return gulp
            .src('./src/css/*.css')
            .pipe(autoPrefixer())
            .pipe(cssmin())
            .pipe(gulp.dest('./dist/css/'))
    }
    //创建一个打包sass文件的任务
    //先下载node-sass 单独地址 set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
    //再下载gulp-sass 
const sassHandler = function() {
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/sass/'))
}
module.exports.cssHandler = cssHandler;
module.exports.sassHandler = sassHandler;