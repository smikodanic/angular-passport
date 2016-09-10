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
