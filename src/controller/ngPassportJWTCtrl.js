/**
 * Controller: 'NgPassportJWTCtrl'
 */

module.exports = function ($scope, jwtAuth, $state, NGPASSPORT_CONF_JWT) {
    'use strict';
    $scope.strategyName = 'JWT';

    //show current state object
    // console.info('Current state \n', JSON.stringify($state.get($state.current.name), null, 2));

    /******** BASIC AUTHENTICATION ********/
    //when login button is clicked
    $scope.login = function () {
        $scope.errMsg = '';

        jwtAuth
            .login($scope.username, $scope.password)
            .catch(function (err) {
                if (err.data) {
                    $scope.errMsg = err.data.message;
                    console.error(err.data.stack);
                } else {
                    $scope.errMsg = '500 Internal API Server Error: ' + NGPASSPORT_CONF_JWT.API_BASE_URL + NGPASSPORT_CONF_JWT.API_AUTH_PATHNAME;
                }

            });

    };

    //when logout button is clicked
    $scope.logout = function () {
        jwtAuth.logout();
    };
};
