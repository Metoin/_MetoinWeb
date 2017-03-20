var gulp 		  = require('gulp'),
	webpack       = require("webpack"),
	path 		  = require('path'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-clean-css'),
    jshint        = require('gulp-jshint'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    rename        = require('gulp-rename'),
    clean         = require('gulp-clean'),
    concat        = require('gulp-concat'),
    cache         = require('gulp-cache'),
    htmlreplace   = require("gulp-html-replace"),
    browserSync   = require('browser-sync').create();

var webpackConfig = require("./webpack.config.js");

// 清除之前打包的文件
gulp.task('clear', function() {  
	return gulp.src(['assets/css', 'assets/images', 'assets/js'], {read: false})
		.pipe(clean());
});

// 调用webpack处理html、js、css
gulp.task("webpack", function(callback) {
	var myConfig = Object.create(webpackConfig);
	webpack(myConfig, function(err, stats) {
		// if(err) throw new gutil.PluginError("webpack", err);
		// gutil.log("[webpack]", stats.toString({
		//	 // output options
		// }));
		callback();
	});
});

// scss文件处理
gulp.task('scss', function() {
	return gulp.src('source/assets/scss/*.scss')
	    .pipe(sass({ style: 'expanded' }))
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    //.pipe(gulp.dest('assets/css'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(minifycss())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream: true}));
});

// css文件处理
gulp.task('css', function() {
	return gulp.src('source/assets/css/*.css')
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    //.pipe(gulp.dest('assets/css'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(minifycss())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream: true}));
});

// image文件处理
gulp.task('image', function() {
	return gulp.src('source/assets/images/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('assets/images'));
});

// SCSS文件中使用的图片处理
gulp.task('scssImg', function() {
	return gulp.src('source/assets/scss/images/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('assets/css/images'));
});

// CSS文件中使用的图片处理
gulp.task('cssImg', function() {
	return gulp.src('source/assets/css/images/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('assets/css/images'));
});

// 处理js文件
/*gulp.task('js', function() {
	return gulp.src()
		.pipe()
		.pipe()
		.pip(gulp.dest());
});*/

/* 文件监控重新刷新
 * 静态服务器
 */
gulp.task('browser', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // 监听css、js、images文件
    gulp.watch("assets/css/*.css", ['css']);
    gulp.watch("assets/css/images/*", ['image']);
    gulp.watch("assets/js/*", ['js']);
    gulp.watch("assets/images/*", ['image']);
    gulp.watch("views/**/*.html", ['html']);
    
    gulp.watch("views/**/*.html").on('change', browserSync.reload);
    gulp.watch("assets/**/*").on('change', browserSync.reload);
});
// 代理方式
/*gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "你的域名或IP"
    });
});*/

gulp.task('default', ['clear', 'webpack', 'js', 'css', 'html', 'browser']);