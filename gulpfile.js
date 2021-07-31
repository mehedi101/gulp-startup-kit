"use strict";

const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const cssnano = require('cssnano');
const browserSync = require('browser-sync');

function sassTask() {
    return src('App/scss/styles.scss',{sourcemaps: true}) 
                .pipe(sass())
                .pipe(postcss([cssnano()]))
                .pipe(dest('Assets/css/',{sourcemaps: '.'}));
}

function jsTask() {
    return src('App/js/scripts.js',{sourcemaps: true}) 
            .pipe(terser())
            .pipe(dest('Assets/js/',{sourcemaps: '.'}))
}

function browserSyncServe(cb){

    browserSync.init({
        server:{
            baseDir:'.'
        }
    });

    cb();
}

function browserSyncReload(cb){
    browserSync.reload();
    cb();
}
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(['App/scss/**/*.scss','App/js/**/*.js'], series(sassTask, jsTask, browserSyncReload));
}

exports.default = series(
    sassTask, 
    jsTask, 
    browserSyncServe, 
    watchTask
    );