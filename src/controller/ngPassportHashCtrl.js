/**
 * Controller: 'NgPassportHashCtrl'
 */

module.exports = function ($scope, hashAuth, $state, NGPASSPORT_CONF_HASH) {
    'use strict';
    $scope.strategyName = 'Hash';

    //show current state object
    // console.info('Current state \n', JSON.stringify($state.get($state.current.name), null, 2));

    //when login button is clicked
    $scope.login = function () {
        $scope.errMsg = '';

        hashAuth
            .login($scope.username, $scope.password)
            .catch(function (err) {
                if (err.data) {
                    $scope.errMsg = err.data.message;
                    console.error(err.data.stack);
                } else {
                    $scope.errMsg = '500 Internal API Server Error: ' + NGPASSPORT_CONF_HASH.API_BASE_URL + NGPASSPORT_CONF_HASH.API_AUTH_PATHNAME;
                }

            });

    };

    //when logout button is clicked
    $scope.logout = function () {
        hashAuth.logout();
    };
};
