const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoPrefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const webserver = require('gulp-webserver');
const fileInclude = require('gulp-file-include')
    /*
    //gulp@3的书写方法
    gulp.task('cssHandler', function() {
        return gulp
            .src('./src/css/*.css')
            .pipe(cssmin())
            .pipe(gulp.dest('./dist/css/'))
    })*/

const cssHandler = function() {
    return gulp
        .src('./src/css/*.css')
        .pipe(autoPrefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
}

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
        .pipe(fileInclude({
            prefix: '@-@',
            basepath: './src/components',
        }))
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
const html1Handler = function() {
    return gulp
        .src('./src/components/*.html')
        .pipe(gulp.dest('./dist/components/'))
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
            proxies: [{
                    //代理通识符
                    source: '/dt',
                    //代理目标地址
                    target: 'https://www.duitang.com/napi/blog/list/by_search/'
                },
                {
                    source: '/my',
                    target: 'http://localhost:80/server.php'
                },
                {
                    source: '/half',
                    target: 'http://localhost:80/'
                },
            ]
        }))
}
const watchHandler = function() {
    gulp.watch('./src/sass/*.scss', sassHandler)
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/js/*.js', jsHandler)
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, html1Handler, sassHandler, jsHandler, htmlHandler, imagesHandler, audiosHandler, videosHandler, fontsHandler, libHandler),
    webHandler,
    watchHandler,
)