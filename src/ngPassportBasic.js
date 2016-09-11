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
    ngPassportBasic.constant('NGPASSPORT_CONF', {
        API_BASE_URL: 'http://localhost:9005',
        API_AUTH_PATHNAME: '/examples/auth/passport/basicstrategy',
        URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/page1',
        URL_AFTER_LOGOUT: '/examples-spa/login/form'
    });
</script>
*/
window.ngPassportBasic = ngPassportBasic;
