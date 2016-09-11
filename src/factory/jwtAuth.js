/**
 * Services for JWT Authentication
 * Notice: $cookies require 'ngCookies' module to be included
 */

module.exports = function ($http, NGPASSPORT_CONF_JWT, $cookies, $location, $state, $timeout) {
    'use strict';

    var jwtAuth = {};

    /**
     * Check credentials (username, password) and set cookie if credentails are correct.
     * @param  {String} u - username
     * @param  {String} p -password
     * @return {Object}   - Q promise
     */
    jwtAuth.login = function (u, p) {

        //delete cookie (on bad login old cookie will be deleted)
        jwtAuth.delCookie('authAPI');

        //check credentials
        var postObj = {
            username: u,
            password: p
        };
        return $http.post(NGPASSPORT_CONF_JWT.API_BASE_URL + NGPASSPORT_CONF_JWT.API_AUTH_PATHNAME, postObj)
            .then(function (respons) {
                if (respons.data.isLoggedIn) {
                    jwtAuth.setCookie('authAPI', respons.data.putLocally);
                    console.log(NGPASSPORT_CONF_JWT.URL_AFTER_SUCCESSFUL_LOGIN);
                    //redirect to another page after successful login
                    if (NGPASSPORT_CONF_JWT.URL_AFTER_SUCCESSFUL_LOGIN) {
                        $location.path(NGPASSPORT_CONF_JWT.URL_AFTER_SUCCESSFUL_LOGIN);
                    }
                }
            });

    };


    /**
     * Logout and redirect to another page.
     * Use it in controller when user clicks on logout button.
     * @return {Boolean} - returns true or false
     */
    jwtAuth.logout = function () {
        jwtAuth.delCookie('authAPI');

        $timeout(function () {
            $location.path(NGPASSPORT_CONF_JWT.URL_AFTER_LOGOUT);
        }, 34);
    };


    /**
     * Set 'obj' inside cookie.
     * @param {String} cookieKey - 'authAPI'
     * @param {Object} obj       - {"username": "john", "authHeader": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTcyNjk1MzcwYmM1MDk2MmUzNDVmZSIsImlhdCI6MTQ3MDU3MjI0NH0.RsiMnjrOjUjmLVC9rcU8Vu3B2h_yfXlBUI5SyBhveek"}
     */
    jwtAuth.setCookie = function (cookieKey, obj) {
        $cookies.putObject(cookieKey, obj);
    };


    /**
     * Return object from cookie.
     * @param {String} cookieKey - 'authAPI'
     * @return {Object}          - {"username": "john", "authHeader": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTcyNjk1MzcwYmM1MDk2MmUzNDVmZSIsImlhdCI6MTQ3MDU3MjI0NH0.RsiMnjrOjUjmLVC9rcU8Vu3B2h_yfXlBUI5SyBhveek"} || {"username": "", "authHeader": ""}
     */
    jwtAuth.getCookie = function (cookieKey) {
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
    jwtAuth.delCookie = function (cookieKey) {
        $cookies.remove(cookieKey);
    };


    /**
     * Protect UI-router's state from unauthorized access.
     * Implement inside main.js run() method --> $rootScope.$on('$stateChangeSuccess', jwtAuth.onstateChangeSuccess);
     * @param  {String} redirectUrl -url after successful login
     * @return {Boolean} - returns true or false
     */
    jwtAuth.protectUIRouterState = function (event, toState, toParams, fromState, fromParams) {
        event.preventDefault();

        // console.log('authRequired: ', JSON.stringify($state.current.authRequired, null, 2));

        //check authentication if it's defined inside state with     authRequired: true
        //see '/routes-ui/examples-spa_login.js'
        if ($state.current.authRequired) {

            //redirect if 'authAPI' cookie doesn't exists
            if (!jwtAuth.isAuthenticated()) {
                jwtAuth.logout(NGPASSPORT_CONF_JWT.URL_AFTER_LOGOUT);
            }

        }
    };


    /**
     * Determine if app is authenticated or not. E.g. if user is logged in or not.
     * Authenticated is when cookie 'authAPI' exists.
     * @return {Boolean} - returns true or false
     */
    jwtAuth.isAuthenticated = function () {
        if (jwtAuth.getCookie('authAPI')) {
            return !!jwtAuth.getCookie('authAPI').username;
        } else {
            return false;
        }
    };



    return jwtAuth;

};
