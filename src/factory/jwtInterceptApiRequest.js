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
