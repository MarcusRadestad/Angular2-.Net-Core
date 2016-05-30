/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

require('es6-promise').polyfill();
var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    tsProject = tsc.createProject('./app/tsconfig.json'),
    clean = require('gulp-clean'),
    del = require('del'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano');


var config = {

    wwwRoot_Lib_DestinationPath: './wwwroot/libs/',


    relativePathsToRequiredLibs: [
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js'
    ],

    relativePathsToRequiredStyles: [
      'css/bootstrap.css',
    ],

    npm_libs : [
         'es6-shim/es6-shim.min.js',
         'systemjs/dist/system-polyfills.js',
         'systemjs/dist/system.src.js',
         'reflect-metadata/Reflect.js',
         'reflect-metadata/Reflect.js.map',
         'rxjs/**',
         'core-js/**',
         'zone.js/dist/**',
         '@angular/**',
         'jquery/dist/jquery.*js',
         'bootstrap/dist/js/bootstrap.*js'
    ],

    allTypeScript: ['./App/**/*.ts'],
    typeScriptDefinitions : './typings/main/**/*.ts'
}


var getStamp = function () {
    var myDate = new Date();

    var myYear = myDate.getFullYear().toString();
    var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
    var myDay = ('0' + myDate.getDate()).slice(-2);
    var mySeconds = myDate.getSeconds().toString();

    var myFullDate = myYear + myMonth + myDay + mySeconds;

    return myFullDate;
};



gulp.task('live-Reload', function () {
    console.log("run!");    
    livereload.reload();    
});


gulp.task('watchForLiveReload', function () {
    gulp.watch(['./wwwroot/app/**/*.js'], ['live-Reload']);

    gulp.src(['./wwwroot/app/**/*.js'], { read: false }).pipe(print());

    livereload.listen();    
});


gulp.task('inject_requiredLibs', function () {

    var target = gulp.src('./wwwroot/index.html');

    var sources = gulp.src(config.relativePathsToRequiredLibs, { read: false, cwd: "wwwroot/libs/**" });

    return target.pipe(inject(
            sources.pipe(print()), { name: 'libs', relative: true, addRootSlash: false, addSuffix: "?" + getStamp() }))
            .pipe(gulp.dest('./wwwroot'))
});

gulp.task('inject_requiredCss', function () {
    var target = gulp.src('./wwwroot/index.html');

    var sources = gulp.src(config.relativePathsToRequiredStyles, { read: false, cwd: "wwwroot/libs/**" });

    return target.pipe(inject(
            sources.pipe(print()), { name: 'styles', relative: true, addRootSlash: false, addSuffix: "?" + getStamp() }))
            .pipe(gulp.dest('./wwwroot'))
});



gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
            .pipe(tslint())
            .pipe(tslint.report('prose'));
});




gulp.task('wwwRoot_clean', function () {
    return gulp.src(config.wwwRoot_Lib_DestinationPath)
        .pipe(clean());
});

gulp.task('wwwRoot_copy_npm', function () {

    gulp.src([
        'node_modules/bootstrap/dist/css/**',        
    ]).pipe(gulp.dest(config.wwwRoot_Lib_DestinationPath + 'css'));
    gulp.src([
      'node_modules/bootstrap/dist/fonts/**',
    ]).pipe(gulp.dest(config.wwwRoot_Lib_DestinationPath + 'fonts'));

    return gulp.src(config.npm_libs, { cwd: "node_modules/**" })
        .pipe(gulp.dest(config.wwwRoot_Lib_DestinationPath));
});






gulp.task('ts', function (done) {

    var tsResult = gulp.src(["./App/**/*.ts"])
        .pipe(tsc(tsProject, undefined, tsc.reporter.defaultReporter()));

    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('watch', ['watch.ts']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('app/*.ts', ['ts']);
});
