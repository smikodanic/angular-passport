/*!
 *  v1.0.0 (https://github.com/smikodanic/angular-passport#readme)
 * Copyright 2014-2016 Sasa Mikodanic
 * Licensed under MIT (Freely you received, freely give. , Mt10:8) 
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/**
 * Controller: 'NgPassportJWTCtrl'
 */

module.exports = function ($scope, jwtAuth, $state, NGPASSPORT_CONF_JWT) {
    'use strict';
    $scope.strategyName = 'JWT';

    //show current state object
    // console.info('Current state \n', JSON.stringify($state.get($state.current.name), null, 2));

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

},{}],4:[function(require,module,exports){
module.exports = function (ctrl) {
    'use strict';

    return function () {

        var ngpassportForm = {
            restrict: 'E',
            replace: true,
            controller: ctrl,
            scope: {templateUrl: '='},
            templateUrl: function (tElement, tAttrs) {
                return tAttrs.templateUrl || 'formSimple.html'; //used <ngpassport-form template-url="myTemplate.html"></ngpassport-form>
            }
        };

        return ngpassportForm;
    };
};

},{}],5:[function(require,module,exports){
module.exports = function (ctrl) {
    'use strict';

    return function () {

        var ngpassportLogout = {
            restrict: 'EC',
            replace: true,
            controller: ctrl,
            scope: {templateUrl: '='},
            templateUrl: function (tElement, tAttrs) {
                return tAttrs.templateUrl || 'logoutSimple.html'; //used <ngpassport-form template-url="formSimple.html"></ngpassport-form>
            }
        };

        return ngpassportLogout;
    };
};

},{}],6:[function(require,module,exports){
module.exports = function () {
    'use strict';

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                console.error("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

};

},{}],7:[function(require,module,exports){
/**
 * Services for Basic Authentication
 * Notice: $cookies require 'ngCookies' module to be included
 */

module.exports = function ($http, NGPASSPORT_CONF_BASIC, base64, $cookies, $location, $state, $timeout) {
    'use strict';

    var basicAuth = {};

    /**
     * Check credentials (username, password) and set cookie if credentails are correct.
     * @param  {String} u - username
     * @param  {String} p -password
     * @return {Object}   - Q promise
     */
    basicAuth.login = function (u, p) {

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

        return $http.get(NGPASSPORT_CONF_BASIC.API_BASE_URL + NGPASSPORT_CONF_BASIC.API_AUTH_PATHNAME, http_config)
            .then(function (respons) {
                if (respons.data.isLoggedIn) {
                    basicAuth.setCookie('authAPI', respons.data.putLocally);

                    //redirect to another page
                    if (NGPASSPORT_CONF_BASIC.URL_AFTER_SUCCESSFUL_LOGIN) {
                        $location.path(NGPASSPORT_CONF_BASIC.URL_AFTER_SUCCESSFUL_LOGIN);
                    }
                }
            });

    };


    /**
     * Logout and redirect to another page.
     * Use it in controller when user clicks on logout button.
     * @return {Boolean} - returns true or false
     */
    basicAuth.logout = function () {
        basicAuth.delCookie('authAPI');

        $timeout(function () {
            $location.path(NGPASSPORT_CONF_BASIC.URL_AFTER_LOGOUT);
        }, 34);
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
                basicAuth.logout(NGPASSPORT_CONF_BASIC.URL_AFTER_LOGOUT);
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

};

},{}],8:[function(require,module,exports){
/**
 * API Request interceptor
 * Notice: $injector is required to inject basicAuth, because config() accepts providers only not services.
 */

module.exports = function ($injector) {
    'use strict';

    var interceptApiRequest = {};

    /**
     * REQUEST INTERCEPTOR
     *
     * @param  {Object} config    - $http config parameter
     *     *** $http.get('/someUrl', config).then(successCallback, errorCallback);
     *     *** $http.post('/someUrl', data, config).then(successCallback, errorCallback);
     */
    interceptApiRequest.request = function (config) {
        var basicAuth = $injector.get('basicAuth'); //get basicAuth factory

        //Intercept with 'Authorization' header only when cookie is set, e.g. when user is logged in.
        //When user is not logged in don't add 'Authorization' header.
        if (basicAuth.getCookie('authAPI').authHeader) {
            config.headers['Authorization'] = basicAuth.getCookie('authAPI').authHeader; // 'Basic am9objp0ZXN0'
        }

        // console.log('$http config\n', JSON.stringify(config, null, 2));

        return config;
    };


    interceptApiRequest.requestError = function(config) {
        return config;
    },

    interceptApiRequest.response = function(res) {
        return res;
    },

    interceptApiRequest.responseError = function(res) {
        throw res;
    }





    return interceptApiRequest;

};

},{}],9:[function(require,module,exports){
/**
 * Services for Hash Authentication
 * Notice: $cookies require 'ngCookies' module to be included
 */

module.exports = function ($http, NGPASSPORT_CONF_HASH, $cookies, $location, $state, $timeout) {
    'use strict';

    var hashAuth = {};

    /**
     * Check credentials (username, password) and set cookie if credentails are correct.
     * @param  {String} u - username
     * @param  {String} p -password
     * @return {Object}   - Q promise
     */
    hashAuth.login = function (u, p) {

        //delete cookie (on bad login old cookie will be deleted)
        hashAuth.delCookie('authAPI');

        //check credentials
        var postObj = {
            username: u,
            password: p
        };
        return $http.post(NGPASSPORT_CONF_HASH.API_BASE_URL + NGPASSPORT_CONF_HASH.API_AUTH_PATHNAME, postObj)
            .then(function (respons) {
                if (respons.data.isLoggedIn) {
                    hashAuth.setCookie('authAPI', respons.data.putLocally);
                    // console.log(NGPASSPORT_CONF_HASH.URL_AFTER_SUCCESSFUL_LOGIN);
                    //redirect to another page after successful login
                    if (NGPASSPORT_CONF_HASH.URL_AFTER_SUCCESSFUL_LOGIN) {
                        $location.path(NGPASSPORT_CONF_HASH.URL_AFTER_SUCCESSFUL_LOGIN);
                    }
                }
            });

    };


    /**
     * Logout and redirect to another page.
     * Use it in controller when user clicks on logout button.
     * @return {Boolean} - returns true or false
     */
    hashAuth.logout = function () {
        hashAuth.delCookie('authAPI');

        $timeout(function () {
            $location.path(NGPASSPORT_CONF_HASH.URL_AFTER_LOGOUT);
        }, 34);
    };


    /**
     * Set 'obj' inside cookie.
     * @param {String} cookieKey - 'authAPI'
     * @param {Object} obj       - {"username": "john", "hash": "e7b1951a91718085f4382391c31ef175df72addddb"}
     */
    hashAuth.setCookie = function (cookieKey, obj) {
        $cookies.putObject(cookieKey, obj);
    };


    /**
     * Return object from cookie.
     * @param {String} cookieKey - 'authAPI'
     * @return {Object}          - {"username": "john", "hash": "e7b1951a91718085f4382391c31ef175df72addddb"} || {"username": "", "hash": ""}
     */
    hashAuth.getCookie = function (cookieKey) {
        var cookieObj = $cookies.getObject(cookieKey);

        if (cookieObj) {
            return cookieObj;
        } else {
            return {
                username: '',
                hash: ''
            };
        }
    };


    /**
     * Delete cookie, usually on logout.
     * @param {String} cookieKey - 'authAPI'
     */
    hashAuth.delCookie = function (cookieKey) {
        $cookies.remove(cookieKey);
    };


    /**
     * Protect UI-router's state from unauthorized access.
     * Implement inside main.js run() method --> $rootScope.$on('$stateChangeSuccess', hashAuth.onstateChangeSuccess);
     * @param  {String} redirectUrl -url after successful login
     * @return {Boolean} - returns true or false
     */
    hashAuth.protectUIRouterState = function (event, toState, toParams, fromState, fromParams) {
        event.preventDefault();

        // console.log('authRequired: ', JSON.stringify($state.current.authRequired, null, 2));

        //check authentication if it's defined inside state with     authRequired: true
        //see '/routes-ui/examples-spa_login.js'
        if ($state.current.authRequired) {

            //redirect if 'authAPI' cookie doesn't exists
            if (!hashAuth.isAuthenticated()) {
                hashAuth.logout(NGPASSPORT_CONF_HASH.URL_AFTER_LOGOUT);
            }

        }
    };


    /**
     * Determine if app is authenticated or not. E.g. if user is logged in or not.
     * Authenticated is when cookie 'authAPI' exists.
     * @return {Boolean} - returns true or false
     */
    hashAuth.isAuthenticated = function () {
        if (hashAuth.getCookie('authAPI')) {
            return !!hashAuth.getCookie('authAPI').username;
        } else {
            return false;
        }
    };



    return hashAuth;

};

},{}],10:[function(require,module,exports){
/**
 * API Request interceptor
 * Notice: $injector is required to inject hashAuth, because config() accepts providers only not services.
 */

module.exports = function ($injector, NGPASSPORT_CONF_HASH) {
    'use strict';

    var interceptApiRequest = {};

    /**
     * REQUEST INTERCEPTOR
     *
     * @param  {Object} config    - $http config parameter
     *     *** $http.get('/someUrl', config).then(successCallback, errorCallback);
     *     *** $http.post('/someUrl', data, config).then(successCallback, errorCallback);
     */
    interceptApiRequest.request = function (config) {
        var hashAuth = $injector.get('hashAuth'); //get hashAuth factory

        //Intercept by adding hash string at the URL's end, only when cookie is set, e.g. when user is logged in.
        //When user is not logged in don't add hash sufix at the URL's end.
        // Important: only to API endpoints will be added hash string e.g. to urls which have NGPASSPORT_CONF_HASH.API_BASE_URL
        var hashStr = hashAuth.getCookie('authAPI').hash;
        if (hashStr && config.url.indexOf(NGPASSPORT_CONF_HASH.API_BASE_URL) !== -1) {
            config.url = config.url + '/' + hashStr;
        }

        // console.log('$http config\n', JSON.stringify(config, null, 2));

        return config;
    };


    return interceptApiRequest;

};

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
/**
 * API Request interceptor
 * Notice: $injector is required to inject jwtAuth, because config() accepts providers only not services.
 */

module.exports = function ($injector) {
    'use strict';

    var interceptApiRequest = {};

    /**
     * REQUEST INTERCEPTOR
     *
     * @param  {Object} config    - $http config parameter
     *     *** $http.get('/someUrl', config).then(successCallback, errorCallback);
     *     *** $http.post('/someUrl', data, config).then(successCallback, errorCallback);
     */
    interceptApiRequest.request = function (config) {
        var jwtAuth = $injector.get('jwtAuth'); //get jwtAuth factory

        //Intercept with 'Authorization' header only when cookie is set, e.g. when user is logged in.
        //When user is not logged in don't add 'Authorization' header.
        if (jwtAuth.getCookie('authAPI').authHeader) {
            config.headers['Authorization'] = jwtAuth.getCookie('authAPI').authHeader; // 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTcyNjk1MzcwYmM1MDk2MmUzNDVmZSIsImlhdCI6MTQ3MDU3MjI0NH0.RsiMnjrOjUjmLVC9rcU8Vu3B2h_yfXlBUI5SyBhveek'
        }

        // console.log('$http config\n', JSON.stringify(config, null, 2));

        return config;
    };


    return interceptApiRequest;

};

},{}],13:[function(require,module,exports){
module.exports.ngPassportBasic = require('./ngPassportBasic');
module.exports.ngPassportJWT = require('./ngPassportJWT');
module.exports.ngPassportHash = require('./ngPassportHash');



},{"./ngPassportBasic":14,"./ngPassportHash":15,"./ngPassportJWT":16}],14:[function(require,module,exports){
/*global angular, window*/

/***************************** BASIC AUTHETICATION ****************
 http://passportjs.org/docs/basic-digest
 ******************************************************************/
var ngPassportBasic = angular.module('ngPassport.basicStrategy', []);

ngPassportBasic.controller('NgPassportBasicCtrl', require('./controller/ngPassportBasicCtrl'));

ngPassportBasic.factory('basicAuth', require('./factory/basicAuth'));
ngPassportBasic.factory('base64', require('./factory/base64'));
ngPassportBasic.factory('basicInterceptApiRequest', require('./factory/basicInterceptApiRequest'));

//protect API endpoints
ngPassportBasic.config(function ($httpProvider) {
    'use strict';
    $httpProvider.interceptors.push('basicInterceptApiRequest');
});

//protect pages e.g. ui-router's states
ngPassportBasic.run(function ($rootScope, basicAuth) {
    'use strict';
    $rootScope.$on('$stateChangeSuccess', basicAuth.protectUIRouterState);
});



/* login form and logout button directives */
ngPassportBasic.directive('ngpassportForm', require('./directive/ngpassportForm')('NgPassportBasicCtrl'));
ngPassportBasic.directive('ngpassportLogout', require('./directive/ngpassportLogout')('NgPassportBasicCtrl'));

//define default templates
ngPassportBasic.run(function ($templateCache) {
    'use strict';
    $templateCache.put('formSimple.html', '<div><form> username: <input type="text" ng-model="username"> <br>password: <input type="password" ng-model="password"> <button type="button" ng-click="login()">Login</button></form>{{errMsg}}</div>');
    $templateCache.put('logoutSimple.html', '<button ng-click="logout()">Logout</button>');
});






/*when used in browserify (require('angular-passport')) */
module.exports = ngPassportBasic;





/*when included in html file
<script src=".../dist/js/ngPassport.js"></script>
<script>
    ngPassportBasic.constant('NGPASSPORT_CONF_BASIC', {
        API_BASE_URL: 'http://localhost:9005',
        API_AUTH_PATHNAME: '/examples/auth/passport/basicstrategy',
        URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/basic/page1',
        URL_AFTER_LOGOUT: '/examples-spa/login/basic/form'
    });
</script>
*/
window.ngPassportBasic = ngPassportBasic;

},{"./controller/ngPassportBasicCtrl":1,"./directive/ngpassportForm":4,"./directive/ngpassportLogout":5,"./factory/base64":6,"./factory/basicAuth":7,"./factory/basicInterceptApiRequest":8}],15:[function(require,module,exports){
/*global angular, window*/

/***************************** HASH AUTHETICATION ****************
 https://github.com/yuri-karadzhov/passport-hash
 ******************************************************************/
var ngPassportHash = angular.module('ngPassport.hashStrategy', []);

ngPassportHash.controller('NgPassportHashCtrl', require('./controller/ngPassportHashCtrl'));

ngPassportHash.factory('hashAuth', require('./factory/hashAuth'));
ngPassportHash.factory('hashInterceptApiRequest', require('./factory/hashInterceptApiRequest'));

//protect API endpoints
ngPassportHash.config(function ($httpProvider) {
    'use strict';
    $httpProvider.interceptors.push('hashInterceptApiRequest');
});

//protect pages e.g. ui-router's states
ngPassportHash.run(function ($rootScope, hashAuth) {
    'use strict';
    $rootScope.$on('$stateChangeSuccess', hashAuth.protectUIRouterState);
});



/* login form and logout button directives */
ngPassportHash.directive('ngpassportForm', require('./directive/ngpassportForm')('NgPassportHashCtrl'));
ngPassportHash.directive('ngpassportLogout', require('./directive/ngpassportLogout')('NgPassportHashCtrl'));

//define default templates
ngPassportHash.run(function ($templateCache) {
    'use strict';
    $templateCache.put('formSimple.html', '<div><form> username: <input type="text" ng-model="username"> <br>password: <input type="password" ng-model="password"> <button type="button" ng-click="login()">Login</button></form>{{errMsg}}</div>');
    $templateCache.put('logoutSimple.html', '<button ng-click="logout()">Logout</button>');
});






/*when used in browserify (require('angular-passport')) */
module.exports = ngPassportHash;





/*when included in html file
<script src=".../dist/js/ngPassport.js"></script>
<script>
    ngPassportHash.constant('NGPASSPORT_CONF_HASH', {
        API_BASE_URL: 'http://localhost:9005',
        API_AUTH_PATHNAME: '/examples/auth/passport/hashstrategy-gethash',
        URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/hash/page1',
        URL_AFTER_LOGOUT: '/examples-spa/login/hash/form'
    });
</script>
*/
window.ngPassportHash = ngPassportHash;

},{"./controller/ngPassportHashCtrl":2,"./directive/ngpassportForm":4,"./directive/ngpassportLogout":5,"./factory/hashAuth":9,"./factory/hashInterceptApiRequest":10}],16:[function(require,module,exports){
/*global angular, window*/

/***************************** JWT (Json Web Token) AUTHETICATION ****************
 https://github.com/themikenicholson/passport-jwt
 ******************************************************************/
var ngPassportJWT = angular.module('ngPassport.JWTStrategy', []);

ngPassportJWT.controller('NgPassportJWTCtrl', require('./controller/ngPassportJWTCtrl'));

ngPassportJWT.factory('jwtAuth', require('./factory/jwtAuth'));
ngPassportJWT.factory('jwtInterceptApiRequest', require('./factory/jwtInterceptApiRequest'));

//protect API endpoints
ngPassportJWT.config(function ($httpProvider) {
    'use strict';
    $httpProvider.interceptors.push('jwtInterceptApiRequest');
});

//protect pages e.g. ui-router's states
ngPassportJWT.run(function ($rootScope, jwtAuth) {
    'use strict';
    $rootScope.$on('$stateChangeSuccess', jwtAuth.protectUIRouterState);
});



/* login form and logout button directives */
ngPassportJWT.directive('ngpassportForm', require('./directive/ngpassportForm')('NgPassportJWTCtrl'));
ngPassportJWT.directive('ngpassportLogout', require('./directive/ngpassportLogout')('NgPassportJWTCtrl'));

//define default templates
ngPassportJWT.run(function ($templateCache) {
    'use strict';
    $templateCache.put('formSimple.html', '<div><form> username: <input type="text" ng-model="username"> <br>password: <input type="password" ng-model="password"> <button type="button" ng-click="login()">Login</button></form>{{errMsg}}</div>');
    $templateCache.put('logoutSimple.html', '<button ng-click="logout()">Logout</button>');
});






/*when used in browserify (require('angular-passport')) */
module.exports = ngPassportJWT;





/*when included in html file
<script src=".../dist/js/ngPassport.js"></script>
<script>
    ngPassportJWT.constant('NGPASSPORT_CONF_JWT', {
        API_BASE_URL: 'http://localhost:9005',
        API_AUTH_PATHNAME: '/examples/auth/passport/jwtstrategy-gettoken',
        URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/jwt/page1',
        URL_AFTER_LOGOUT: '/examples-spa/login/jwt/form'
    });
</script>
*/
window.ngPassportJWT = ngPassportJWT;

},{"./controller/ngPassportJWTCtrl":3,"./directive/ngpassportForm":4,"./directive/ngpassportLogout":5,"./factory/jwtAuth":11,"./factory/jwtInterceptApiRequest":12}]},{},[13]);
