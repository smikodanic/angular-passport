/**
 * Controller: 'NgPassportBasicCtrl'
 */

module.exports = function ($scope, basicAuth, $state, APPCONF) {
    'use strict';
    $scope.strategyName = 'Basic';

    //show current state object
    // console.info('Current state \n', JSON.stringify($state.get($state.current.name), null, 2));

    /******** BASIC AUTHENTICATION ********/
    //click on login button
    $scope.basicLogin = function () {
        $scope.errMsg = '';

        basicAuth
            .login($scope.username, $scope.password, '/examples-spa/login/page1')
            .catch(function (err) {
                if (err.data) {
                    $scope.errMsg = err.data.message;
                    console.error(err.data.stack);
                } else {
                    $scope.errMsg = 'Bad API request: ' + APPCONF.API_BASE_URL + '/examples-spa/login/page1';
                }

            });

    };

    //logout button
    $scope.logout = function () {
        basicAuth.logout('/examples-spa/login/pageform');
    };
};
