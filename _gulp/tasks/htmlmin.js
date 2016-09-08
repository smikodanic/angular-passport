var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

module.exports = function () {
    'use strict';

    return gulp
        .src([
            './client/src/app/**/*.html'
        ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./client/dist/html/'));

};
