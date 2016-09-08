/**
 * SCSS compiler
 * Compiles SCSS files into CSS.
 */
var compass = require('gulp-compass');

module.exports = function (gulp) {
    'use strict';
    gulp
        .src([
            'client/src/main.scss'
        ])
        .pipe(compass({
            style: 'expanded', //nested, expanded, compact, or compressed
            comments: false, //show comments or not
            css: 'client/dist/css', //target dir
            sass: 'client/src', //source sass/scss files dir
            logging: true,
            time: true
        }));
};
