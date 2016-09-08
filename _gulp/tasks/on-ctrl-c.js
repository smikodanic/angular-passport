module.exports = function (gulp) {
    'use strict';
    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.on('data', function catchCtrlC(data) {
        if (data.length === 1 && data[0] === 0x03) { //0x03 is CTRL+c
            gulp.start('pm2-stop', function () {
                console.log('\nExiting ... Please wait.\n');
                setTimeout(function () {
                    process.exit(); //exiting gulp
                }, 3400);
            });
        }
    });
};