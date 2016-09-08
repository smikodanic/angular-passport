var gulp = require('gulp');

//GULP Tasks
gulp.task('rimraf', require('./tasks/rimraf.js'));
gulp.task('browserify-uglify', require('./tasks/browserify-uglify.js'));
gulp.task('browserify', require('./tasks/browserify.js'));
gulp.task('htmlmin', require('./tasks/htmlmin.js'));


var compass = require('gulp-compass');
gulp.task('scss', function () {
    'use strict';
    gulp
        .src([
            'src/main.scss'
        ])
        .pipe(compass({
            style: 'expanded', //nested, expanded, compact, or compressed
            comments: false, //show comments or not
            css: 'dist/css', //target dir
            sass: 'src', //source sass/scss files dir
            logging: true,
            time: true
        }));
});


//gulp watchers
gulp.task('watch', function () {
    'use strict';

    //*** watch client side
    gulp.watch([
        'src/**/*.js'
    ], ['browserify', 'browserify-uglify']);

    gulp.watch([
        'src/**/*.html'
    ], ['htmlmin']);

    gulp.watch([
        'src/**/*.scss'
    ], ['scss']);

});


//first delete then create JS, HTML and CSS files in /client/dist/ directory
gulp.task('build-dist', ['rimraf'], function () {
    'use strict';
    setTimeout(function () {
        gulp.start('browserify', 'browserify-uglify', 'htmlmin', 'scss');
    }, 1300);
});



//defult gulp task
gulp.task('default', ['build-dist', 'watch']);
