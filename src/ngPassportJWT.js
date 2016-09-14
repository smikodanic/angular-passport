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
