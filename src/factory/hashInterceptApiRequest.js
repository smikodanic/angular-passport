/**
 * API Request interceptor
 * Notice: $injector is required to inject hashAuth, because config() accepts providers only not services.
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
        var hashAuth = $injector.get('hashAuth'); //get hashAuth factory

        //Intercept by adding hash string at the URL's end, only when cookie is set, e.g. when user is logged in.
        //When user is not logged in don't add hash sufix at the URL's end.
        var hashStr = hashAuth.getCookie('authAPI').hash;
        console.log('hashStr ', hashStr);
        if (hashStr) {
            config.url = config.url + '/' + hashStr;
        }

        console.log('$http config\n', JSON.stringify(config, null, 2));

        return config;
    };


    return interceptApiRequest;

};
