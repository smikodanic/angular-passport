/* BASIC AUTH MODULE */
var ngPassportBasic = angular.module('ngPassport.basicStrategy', []);

ngPassportBasic.controller('NgPassportCtrl', require('./controller/ngPassportCtrl'))
    .factory('basicAuth', function ($http, APPCONF, base64, $cookies, $location, $state, $timeout) {
    'use strict';

    var basicAuth = {};

    /**
     * Check credentials (username, password) and set cookie if credentails are correct.
     * @param  {String} u - username
     * @param  {String} p -password
     * @param  {String} redirectUrl -url after successful login
     * @return {Object}   - API object
     */
    basicAuth.login = function (u, p, redirectUrl) {

        //encoding
        var input = u + ':' + p;
        var input64 = base64.encode(input);

        //$http config
        var http_config = {
            headers: {
                Authorization: 'Basic ' + input64
            }
        };
        // console.log(JSON.stringify(http_config, null, 2));

        //delete cookie (on bad login old cookie will be deleted)
        basicAuth.delCookie('authAPI');

        return $http.get(APPCONF.API_BASE_URL + '/examples/auth/passport/basicstrategy', http_config)
            .then(function (respons) {
                if (respons.data.isSuccess) {
                    basicAuth.setCookie('authAPI', respons.data.putLocally);

                    //redirect to another page
                    if (redirectUrl) {
                        $location.path(redirectUrl);
                    }
                }
            });

    };


    /**
     * Set 'obj' inside cookie.
     * @param {String} cookieKey - 'authAPI'
     * @param {Object} obj       - {"username": "john", "authHeader": "Basic am9objp0ZXN0"}
     */
    basicAuth.setCookie = function (cookieKey, obj) {
        $cookies.putObject(cookieKey, obj);
    };

    /**
     * Return object from cookie.
     * @param {String} cookieKey - 'authAPI'
     * @return {Object}          - {"username": "john", "authHeader": "Basic am9objp0ZXN0"} || {"username": "", "authHeader": ""}
     */
    basicAuth.getCookie = function (cookieKey) {
        var cookieObj = $cookies.getObject(cookieKey);

        if (cookieObj) {
            return cookieObj;
        } else {
            return {
                username: '',
                authHeader: ''
            };
        }
    };

    /**
     * Delete cookie, usually on logout.
     * @param {String} cookieKey - 'authAPI'
     */
    basicAuth.delCookie = function (cookieKey) {
        $cookies.remove(cookieKey);
    };


    /**
     * Logout and redirect to another page.
     * Use it in controller when user clicks on logout button.
     * @param  {String} redirectUrl -url after successful login
     * @return {Boolean} - returns true or false
     */
    basicAuth.logout = function (redirectUrl) {
        basicAuth.delCookie('authAPI');

        $timeout(function () {
            $location.path(redirectUrl);
        }, 34);
    };


    /**
     * Protect UI-router's state from unauthorized access.
     * Implement inside main.js run() method --> $rootScope.$on('$stateChangeSuccess', basicAuth.onstateChangeSuccess);
     * @param  {String} redirectUrl -url after successful login
     * @return {Boolean} - returns true or false
     */
    basicAuth.protectUIRouterState = function (event, toState, toParams, fromState, fromParams) {
        event.preventDefault();

        // console.log('authRequired: ', JSON.stringify($state.current.authRequired, null, 2));

        //check authentication if it's defined inside state with     authRequired: true
        //see '/routes-ui/examples-spa_login.js'
        if ($state.current.authRequired) {

            //redirect if 'authAPI' cookie doesn't exists
            if (!basicAuth.isAuthenticated()) {
                basicAuth.logout('/examples-spa/login/pageform');
            }

        }
    };



    /**
     * Determine if app is authenticated or not. E.g. if user is logged in or not.
     * Authenticated is when cookie 'authAPI' exists.
     * @return {Boolean} - returns true or false
     */
    basicAuth.isAuthenticated = function () {
        if (basicAuth.getCookie('authAPI')) {
            return !!basicAuth.getCookie('authAPI').username;
        } else {
            return false;
        }
    };




    return basicAuth;

});
