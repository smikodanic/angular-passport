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
ngPassportHash.directive('ngpassportForm', require('./directive/ngpassportForm')('ngPassportHashCtrl'));
ngPassportHash.directive('ngpassportLogout', require('./directive/ngpassportLogout')('ngPassportHashCtrl'));

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
