# angular-passport
> Angular module for PassportJS login and API auth. Strategies: Basic, JWT &amp; Hash

## Installation
npm install --save angular-passport

## Prerequisites
- ngCookies (<a href="https://docs.angularjs.org/api/ngCookies">https://docs.angularjs.org/api/ngCookies</a>)
- ui.router (<a href="https://github.com/angular-ui/ui-router">https://github.com/angular-ui/ui-router</a>)

	```javascript
	var clientApp = angular.module('clientApp', [
	    'ui.router',
	    'ngCookies',
	    'ngPassport.basicStrategy',
	    // 'ngPassport.JWTStrategy',
	    // 'ngPassport.hashStrategy'
	]);
	```


## Usage
### If you use Browserify

```javascript
var ngPassportBasic = require('angular-passport').ngPassportBasic;

/* configure */
ngPassportBasic.constant('NGPASSPORT_CONF_BASIC', {
    // API_BASE_URL: 'http://192.168.1.101:9005',
    API_BASE_URL: 'http://localhost:9005',
    API_AUTH_PATHNAME: '/examples/auth/passport/basicstrategy',
    URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/basic/page1',
    URL_AFTER_LOGOUT: '/examples-spa/login/basic/form'
});
```

### If you include it into HTML file (compiled version)

```javascript
<script src="... /angular-passport/dist/js/ngPassport.js"></script>
<script>
    ngPassportHash.constant('NGPASSPORT_CONF_HASH', {
        API_BASE_URL: 'http://localhost:9005',
        API_AUTH_PATHNAME: '/examples/auth/passport/hashstrategy-gethash',
        URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/hash/page1',
        URL_AFTER_LOGOUT: '/examples-spa/login/hash/form'
    });
</script>
```

---

---


### Basic Authentication
1. When user type username &amp; password in login form a string 'username:password' is encoded to base64 (john:test  =>  am9objp0ZXN0)
2. A request with header: `Authorization: Basic am9objp0ZXN0` is sent to API.
3. If auth was successful API returns object

	```json
	{
	 "isLoggedIn": true,
	 "msg": "Basic authentication was succcessfull.",
	   "putLocally": {
	   		"username": "john",
	   		"authHeader": "Basic am9objp0ZXN0"
	  	}
	}
	```

4. A cookie 'authAPI' is set with object `putLocally` .
5. Angular sets up interceptor with cookie data and each $http request sent to API is intercepted with
   *'Authorization':'Basic am9objp0ZXN0'* header



###JWT Authentication
1. User type username &amp; password and when Login button is clicked request
 `POST /examples/auth/passport/jwtstrategy-gettoken {username: 'john', password: 'test'}` is sent to API
2. Client receives respond object from API

	```javascript
	{
	  "isLoggedIn": true,
	  "msg": "Login was successful. JWT Token is generated and you can use it in request header to access API. Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTcyNjk1MzcwYmM1MDk2MmUzNDVmZSIsImlhdCI6MTQ3Mzg2MDgyM30.R-OPMVRUXgZ2RK4iPkmEMWGbKg7iN_zJj1MA1cGBHWY",
	  "putLocally": {
	    "username": "john",
	    "authHeader": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTcyNjk1MzcwYmM1MDk2MmUzNDVmZSIsImlhdCI6MTQ3Mzg2MDgyM30.R-OPMVRUXgZ2RK4iPkmEMWGbKg7iN_zJj1MA1cGBHWY"
	  }
	}
	```

3. Object `putLocally` is used to create cookie 'authAPI' .
4. Angular sets up interceptor with cookie data and each $http request sent to API is intercepted with 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YTcyNjk1MzcwYmM1MDk2MmUzNDVmZSIsImlhdCI6MTQ3Mzg2MDgyM30.R-OPMVRUXgZ2RK4iPkmEMWGbKg7iN_zJj1MA1cGBHWY'


###Hash Authentication
*Notice: Hash string must be stored in database and returned by API on user's successful login*

1. User type username &amp; password and when Login button is clicked request
   `POST /examples/auth/passport/hashstrategy-gethash {username: 'john', password: 'test'}` is sent to API
2. Client receives respond object from API

	```javascript
	{
	  "isLoggedIn": true,
	  "msg": "Login was successful. Now you can use hash to access API endpoints. For example: /examples/auth/passport/hashstrategy/e7b1951a91718085f4382391c31ef175df72addddb",
	  "putLocally": {
	    "username": "john",
	    "hash": "e7b1951a91718085f4382391c31ef175df72addddb"
	  }
	}
	```

3. Object `putLocally` is used to create cookie 'authAPI' .
4. Angular sets up interceptor with cookie data and each $http request sent to API is intercepted by adding suffix to URL
   for example: *GET /examples/auth/passport/hashstrategy/e7b1951a91718085f4382391c31ef175df72addddb*




## Preconditions
1. Directive will send 'username' and 'password' object properties to API: **{username: 'john', password: 'test'}** .
   It is also possible to define some other variable names for example 'user', 'pass' if your API requires so.
2. API response object when username and password are correct must have this format:

	```json
	{
		"isLoggedIn": true,
	 	"msg": "Basic authentication was succcessfull.",
	 	"putLocally": {
	  		"username": "john",
	  		"authHeader": "Basic am9objp0ZXN0"
		}
	}
	```

3. Cookie will be set with 'putLocally' object, so it must have 'username' property.
4. Configuration constants
  - NGPASSPORT_CONF_BASIC
	```javascript
	var ngPassportBasic = require('angular-passport').ngPassportBasic;

	/* configure */
	ngPassportBasic.constant('NGPASSPORT_CONF_BASIC', {
	    // API_BASE_URL: 'http://192.168.1.101:9005',
	    API_BASE_URL: 'http://localhost:9005',
	    API_AUTH_PATHNAME: '/examples/auth/passport/basicstrategy',
	    URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/basic/page1',
	    URL_AFTER_LOGOUT: '/examples-spa/login/basic/form'
	});

	module.exports = ngPassportBasic;
	```

  - NGPASSPORT_CONF_JWT
	```javascript
	var ngPassportJWT = require('angular-passport').ngPassportJWT;

	/* configure */
	ngPassportJWT.constant('NGPASSPORT_CONF_JWT', {
	    // API_BASE_URL: 'http://192.168.1.101:9005',
	    API_BASE_URL: 'http://localhost:9005',
	    API_AUTH_PATHNAME: '/examples/auth/passport/jwtstrategy-gettoken',
	    URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/jwt/page1',
	    URL_AFTER_LOGOUT: '/examples-spa/login/jwt/form'
	});

	module.exports = ngPassportJWT;
	```

  - NGPASSPORT_CONF_HASH
  	```javascript
  	var ngPassportHash = require('angular-passport').ngPassportHash;

	/* configure */
	ngPassportHash.constant('NGPASSPORT_CONF_HASH', {
	    API_BASE_URL: 'http://192.168.1.101:9005',
	    // API_BASE_URL: 'http://localhost:9005',
	    API_AUTH_PATHNAME: '/examples/auth/passport/hashstrategy-gethash',
	    URL_AFTER_SUCCESSFUL_LOGIN: '/examples-spa/login/hash/page1',
	    URL_AFTER_LOGOUT: '/examples-spa/login/hash/form'
	});

	module.exports = ngPassportHash;
 	```


