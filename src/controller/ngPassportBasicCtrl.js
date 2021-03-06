/**
 * Controller: 'NgPassportBasicCtrl'
 */

module.exports = function ($scope, basicAuth, $state, NGPASSPORT_CONF_BASIC) {
    'use strict';
    $scope.strategyName = 'Basic';

    //show current state object
    // console.info('Current state \n', JSON.stringify($state.get($state.current.name), null, 2));

    //when login button is clicked
    $scope.login = function () {
        $scope.errMsg = '';

        basicAuth
            .login($scope.username, $scope.password)
            .catch(function (err) {
                if (err.data) {
                    $scope.errMsg = err.data.message;
                    console.error('loginERR', err.data.stack);
                } else {
                    $scope.errMsg = '500 Internal API Server Error: ' + NGPASSPORT_CONF_BASIC.API_BASE_URL + NGPASSPORT_CONF_BASIC.API_AUTH_PATHNAME;
                }

            });

    };

    //when logout button is clicked
    $scope.logout = function () {
        basicAuth.logout();
    };
};
