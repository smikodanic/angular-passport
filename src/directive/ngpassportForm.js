module.exports = function (ctrl) {
    'use strict';

    return function ($templateCache) {

        var ngpassportForm = {
            restrict: 'E',
            replace: true,
            controller: ctrl,
            scope: {templateurl: '='},
            link: function (scope, elem, attr) {
                console.log('template-url: ' + attr.templateUrl);
            },
            compile: function (element, attr) {
                console.log('compile element: ' + JSON.stringify(element, null, 2));
                console.log('compile attr: ' + JSON.stringify(attr, null, 2));
            },
            // template: '<div><form> username: <input type="text" ng-model="username"> <br>password: <input type="password" ng-model="password"> <button type="button" ng-click="login()">Login</button></form>{{errMsg}}</div>',
            templateUrl: function (tElement, tAttrs) {
                console.log('tAttrs' + JSON.stringify(tAttrs, null, 2));
                return tAttrs.templateUrl || 'formSimple.html'; //used <ngpassport-form template-url="formSimple.html"></ngpassport-form>
            }
        };

        return ngpassportForm;
    };
};
