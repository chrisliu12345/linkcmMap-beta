//all plugin
var gulp = require('gulp'),//gulp插件
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
	jslint = require('gulp-jslint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    clean = require('gulp-clean'),
    changed = require('gulp-changed'),
    browsersync = require('browser-sync');

var projectPath = 'linkcmMap-beta/',
    gisPath = projectPath + 'js/gis/**/*.js',
    pagePath = projectPath + 'js/page/**/*.js',
	RDPath = projectPath + 'js/RD/**/*.js',
    servicePath = projectPath + 'js/service/**/*.js',
    viewPath = projectPath + 'js/view/**/*.js',
    utilsPath = projectPath + 'js/utils/**/*.js',
    jsPath = projectPath + 'js/**/*.js',
    datasPath = projectPath + 'js/data/*.js',
    cssPath = projectPath + 'resources/css/**/*.css';
var gisName = 'linkcmmap.js',
    pageName = 'page.js',
    RDName = 'RD.js',
    serviceName = 'service.js',
    viewName = 'view.js',
    utilsName = 'utils.js',
    datasName = 'datas.js',
    cssName = 'main.css';
    
var DEST = projectPath+'min';
    
// Warning: JSLint will hurt your feelings.
gulp.task('jslint', function() {
  return gulp.src([gisPath,pagePath,RDPath,servicePath,viewPath], 
			 ['gis_uglify','page_uglify','RD_uglify','service_uglify','view_uglify'])
    .pipe(jslint({
        node: true,
        nomen: true,
        sloppy: true,
        plusplus: true,
        unparam: true,
        stupid: true
    }));
});

//browsersync
gulp.task('browser_sync', function() {
    browsersync({
        files: [projectPath + 'min/**/*.*',projectPath+'./*.html'],
        server: {
            baseDir:projectPath + './'
        }
    });
});

// gis_uglify
gulp.task('gis_uglify', function() {
  return gulp.src(gisPath)
    .pipe(changed(DEST))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(gisName))
    //.pipe(gulp.dest('min/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(DEST))
    .pipe(notify({ message: 'gis_uglify task complete' }));
});

// page_uglify
gulp.task('page_uglify', function() {
  return gulp.src(pagePath)
    .pipe(changed(DEST))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(pageName))
    //.pipe(gulp.dest('min/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(DEST))
    .pipe(notify({ message: 'page_uglify task complete' }));
});

// RD_uglify
gulp.task('RD_uglify', function() {
  return gulp.src(RDPath)
    .pipe(changed(DEST))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(RDName))
    //.pipe(gulp.dest('min/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(DEST))
    .pipe(notify({ message: 'RD_uglify task complete' }));
});

// service_uglify
gulp.task('service_uglify', function() {
  return gulp.src(servicePath)
    .pipe(changed(DEST))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(serviceName))
    //.pipe(gulp.dest('min/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(DEST))
    .pipe(notify({ message: 'service_uglify task complete' }));
});

// view_uglify
gulp.task('view_uglify', function() {
  return gulp.src(viewPath)
    .pipe(changed(DEST))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(viewName))
    //.pipe(gulp.dest('min/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(DEST))
    .pipe(notify({ message: 'view_uglify task complete' }));
});

// utils_uglify
gulp.task('utils_uglify', function() {
  return gulp.src(utilsPath)
    .pipe(changed(DEST))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(utilsName))
    //.pipe(gulp.dest('min/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(DEST))
    .pipe(notify({ message: 'utils_uglify task complete' }));
});

// datas_uglify
gulp.task('datas_uglify', function() {
  return gulp.src(datasPath)
    .pipe(changed(DEST))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(utilsName))
    //.pipe(gulp.dest('min/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(DEST))
    .pipe(notify({ message: 'datas_uglify task complete' }));
});

//css
gulp.task('css',function(){
    return gulp.src(cssPath)
    .pipe(changed(DEST))
    .pipe(concat(cssName))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(DEST))
    .pipe(notify({ message: 'css task complete' }));
});

// Clean
// gulp.task('clean', function(cb) {
//     del(['min/**/*.*'], cb)
// });

gulp.task('clean',function(){
    return gulp.src([projectPath + 'min/**/*.*'],{read:false}).pipe(clean());
});

// Default task
gulp.task('default', ['clean','browser_sync'], function() {
    gulp.start( ['gis_uglify','page_uglify','RD_uglify','service_uglify','view_uglify','css']);
});

// Watch
gulp.task('watch', ['default'], function() {
  gulp.watch([gisPath,pagePath,RDPath,servicePath,viewPath,cssPath], 
			 ['gis_uglify','page_uglify','RD_uglify','service_uglify','view_uglify','css']);
  livereload.listen();
  // gulp.watch(['./**']).on('change', livereload.changed);
});