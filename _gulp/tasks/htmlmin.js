var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

module.exports = function () {
    'use strict';

    return gulp
        .src([
            './src/views/**/*.html'
        ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/html/'));

};
