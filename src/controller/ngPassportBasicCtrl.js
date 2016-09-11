/**
 * Controller: 'NgPassportBasicCtrl'
 */

module.exports = function ($scope, basicAuth, $state) {
    'use strict';
    $scope.strategyName = 'Basic';

    //show current state object
    // console.info('Current state \n', JSON.stringify($state.get($state.current.name), null, 2));

    /******** BASIC AUTHENTICATION ********/
    //when login button is clicked
    $scope.login = function () {
        $scope.errMsg = '';

        basicAuth
            .login($scope.username, $scope.password)
            .catch(function (err) {
                if (err.data) {
                    $scope.errMsg = err.data.message;
                    console.error(err.data.stack);
                } else {
                    $scope.errMsg = 'Bad API request: ' + NGPASSPORT_CONF_BASIC.API_BASE_URL + NGPASSPORT_CONF_BASIC.URL_AFTER_SUCCESSFUL_LOGIN;
                }

            });

    };

    //when logout button is clicked
    $scope.logout = function () {
        basicAuth.logout();
    };
};
