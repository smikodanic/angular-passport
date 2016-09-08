/*global angular*/



/***************************** BASIC AUTHETICATION ****************
 http://passportjs.org/docs/basic-digest
 ******************************************************************/
var ngPassportBasic = angular.module('ngPassport.basicStrategy', []);

ngPassportBasic.controller('NgPassportBasicCtrl', require('./controller/ngPassportBasicCtrl'));

ngPassportBasic.factory('basicAuth', require('./factory/basicAuth'));
ngPassportBasic.factory('base64', require('./factory/base64'));
ngPassportBasic.factory('interceptApiRequest', require('./factory/interceptApiRequest'));

module.exports.ngPassportBasic = ngPassportBasic;
