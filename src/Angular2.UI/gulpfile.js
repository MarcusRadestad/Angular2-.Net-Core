
require('es6-promise').polyfill();
var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    runSeq = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    tsProject = tsc.createProject('./tsconfig.json'),
    del = require('del'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    uglify = require('gulp-uglify'),
    flatten = require('gulp-flatten'),
    cssnano = require('gulp-cssnano');



// should be extracted to separate file....
var config = {
    root: "./wwwroot/",
    rootLibFolder: "./wwwroot/lib/",
    rootCssFolder: "./wwwroot/css/",
    rootFontFolder: "./wwwroot/fonts/",
    rootAppFolder: "./wwwroot/app/",
    app: {
        rootFolder: "./Client/App/",
        allTypeScriptFiles: ["./Client/App/**/*.ts"],
        vendorRelativePaths: {
            Js: [
              "es6-shim/es6-shim.min.js",
              "core-js/client/shim.js",
              "zone.js/dist/zone.js",
              "reflect-metadata/Reflect.js",
              "systemjs/dist/system.src.js",
              "rxjs/bundles/Rx.js",
              //"bootstrap/dist/js/bootstrap.js"
            ],
            Css: [
              "bootstrap/dist/css/bootstrap.css"
            ],
            Fonts: [
               "bootstrap/dist/fonts/**"
            ]
        }
    },
    npm_libs: [
      "es6-shim/es6-shim.min.js",
      "systemjs/dist/system-polyfills.js",
      "systemjs/dist/system.src.js",
      "reflect-metadata/Reflect.js",
      "reflect-metadata/Reflect.js.map",
      "rxjs/bundles/*.js",
      "core-js/**",
      "!core-js/**/*.ts",
      "zone.js/dist/**",
      "!zone.js/dist/**/*.ts",
      "@angular/**",
      "!@angular/**/*.ts",
      "angular2-in-memory-web-api/**",
      "!angular2-in-memory-web-api/**/*.ts",
      "bootstrap/dist/js/bootstrap.*js"
    ]
}



// helper functions......

var getStamp = function () {
    var myDate = new Date();

    var myYear = myDate.getFullYear().toString();
    var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
    var myDay = ('0' + myDate.getDate()).slice(-2);
    var mySeconds = myDate.getSeconds().toString();

    var myFullDate = myYear + myMonth + myDay + mySeconds;

    return myFullDate;
};


//  VENDORS  section

gulp.task('wwwRoot_vendor_lib_clean', function (done) {
    return del([
        config.rootLibFolder + "**/*"
    ],done);
});

gulp.task('wwwRoot_vendor_lib_copy', ['wwwRoot_vendor_lib_clean'],function () {
    return gulp.src(config.npm_libs, { cwd: "node_modules/**" })
               .pipe(gulp.dest(config.rootLibFolder));
});

gulp.task('wwwRoot_vendor_font_clean', function (done) {
    return del([
        config.rootFontFolder + "**/*"
    ], done);
});

gulp.task('wwwRoot_vendor_font_copy', ['wwwRoot_vendor_font_clean'], function (done) {    
    return gulp.src(config.app.vendorRelativePaths.Fonts, { cwd: "node_modules/**" })
        .pipe(flatten())
        .pipe(gulp.dest(config.rootFontFolder));
});


gulp.task('wwwRoot_vendor_css_clean', function (done) {
    return del([
        config.rootCssFolder + "**/*"
    ], done);
});

gulp.task('wwwRoot_vendor_css_copy', ['wwwRoot_vendor_css_clean'], function (done) {
    return gulp.src(config.app.vendorRelativePaths.Css, { cwd: "node_modules/**" })
        .pipe(flatten())
        .pipe(gulp.dest(config.rootCssFolder));
});


gulp.task('wwwRoot_vendor_all', function (done) {
    runSeq(
        'wwwRoot_vendor_css_copy',
        'wwwRoot_vendor_font_copy',
        'wwwRoot_vendor_lib_copy',
        done);
});

 

// Index html related:

gulp.task('wwwRoot_index_html_copy', function () {
    return gulp.src("./Client/Index.html")
        .pipe(gulp.dest(config.root));
});

gulp.task('wwwRoot_index_html_inject_libs', function () {

    var target = gulp.src(config.root + "index.html");

    var sources = gulp.src(config.app.vendorRelativePaths.Js, { read: false, cwd: config.rootLibFolder + "**" });

    return target.pipe(inject(
            sources.pipe(print()), { name: 'lib', relative: true, addRootSlash: false, addSuffix: "?" + getStamp() }))
            .pipe(gulp.dest(config.root));
});

gulp.task('wwwRoot_index_html_inject_css', function () {

    var target = gulp.src(config.root + "index.html");

    var sources = gulp.src(config.rootCssFolder + "**", { read: false });

    return target.pipe(inject(
            sources.pipe(print()), { name: 'styles', relative: true, addRootSlash: false, addSuffix: "?" + getStamp() }))
            .pipe(gulp.dest(config.root));
});


gulp.task('wwwRoot_index_html_all', function (done) {
    runSeq(
        "wwwRoot_index_html_copy",
        "wwwRoot_systemjsconfig_copy",
        "wwwRoot_index_html_inject_libs",
        "wwwRoot_index_html_inject_css",
        done);
});



gulp.task('wwwRoot_systemjsconfig_copy', function () {

    return gulp.src("./Client/systemjs.config.js")
           .pipe(gulp.dest(config.root));
});


// app related

gulp.task('wwwRoot_app_templates_clean', function (done) {
    return del([
      config.rootAppFolder + "**/*.html"
    ], done);
});

gulp.task('wwwRoot_app_templates_copy', ['wwwRoot_app_templates_clean'], function () {

    return gulp.src(config.app.rootFolder + "**/*.html")
        .pipe(print())
        .pipe(gulp.dest(config.rootAppFolder));

});

gulp.task('wwwRoot_app_css_clean', function (done) {
    return del([
      config.rootAppFolder + "**/*.css"
    ], done);
});

gulp.task('wwwRoot_app_css_copy', ['wwwRoot_app_css_clean'], function () {

    return gulp.src(config.app.rootFolder + "**/*.css")
        .pipe(print())
        .pipe(gulp.dest(config.rootAppFolder));

});


// development watchers


// will watch all template files and copy only a single file  to wwwroot when changed.
// new/deleted files will not be detected...
gulp.task('development_watch_copy_single_template_on_change', function () {

    gulp.watch(config.app.rootFolder + "**/*.html").on('change', function (file) {
        gulp.src(file.path, { base: config.app.rootFolder })
            .pipe(print())
            .pipe(gulp.dest(config.rootAppFolder));
    });

});
