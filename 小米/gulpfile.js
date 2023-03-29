const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoPrefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const webserver = require('gulp-webserver');
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
const jsHandler = function() {
    return gulp
        .src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        })) //将es6转换为es5,先不需要了 gulp 支持es6转码，主要试试效果
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
}
const htmlHandler = function() {
    return gulp
        .src('./src/pages/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, //移出空格
            removeEmptyAttributes: true, //移除空的属性
            collapseBooleanAttributes: true, //移出check二点类似的布尔值属性
            removeAttributeQuotes: true, //移除属性上的双引号
            minifyCSS: true, //压缩内嵌式css代码 不能添加前缀
            minifyJS: true, //压缩内嵌式js代码 用不了es6的代码
            removeStyleLinkTypeAttributes: true, //压缩link的type属性
            removeScriptTypeAttributes: true, //压缩script的type属性
        }))
        .pipe(gulp.dest('./dist/pages/'))
}
const imagesHandler = function() {
    return gulp
        .src('./src/images/**')
        .pipe(gulp.dest('./dist/images/'))
}
const audiosHandler = function() {
    return gulp
        .src('./src/audios/**')
        .pipe(gulp.dest('./dist/audios/'))
}
const videosHandler = function() {
    return gulp
        .src('./src/videos/**')
        .pipe(gulp.dest('./dist/videos/'))
}
const fontsHandler = function() {
    return gulp
        .src('./src/fonts/**')
        .pipe(gulp.dest('./dist/fonts/'))
}
const libHandler = function() {
    return gulp
        .src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib/'))
}
const delHandler = function() {
    //数组的形式传递你要删除的文件夹
    return del(['./dist/'])
}
const webHandler = function() {
    return gulp
        .src('./dist')
        .pipe(webserver({
            // host: 'localhost', //可以配置自定义域名
            host: 'www.pengyuyan.com', //可以配置自定义域名
            port: '8080',
            livereload: true,
            open: './pages/login.html',
        }))
}
module.exports.cssHandler = cssHandler;
module.exports.sassHandler = sassHandler;
module.exports.jsHandler = jsHandler;
module.exports.htmlHandler = htmlHandler;
module.exports.imagesHandler = imagesHandler;
module.exports.audiosHandler = audiosHandler;
module.exports.videosHandler = videosHandler;
module.exports.fontsHandler = fontsHandler;
module.exports.libHandler = libHandler;
module.exports.delHandler = delHandler;

//一键运行打包，series一个接一个的运行，parallel 平行开始，平行结束
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imagesHandler, audiosHandler, videosHandler, fontsHandler, libHandler),
    webHandler,
)