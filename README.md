# service-auth
Auth service to set authorization and authorize request.

[![Build Status](https://travis-ci.org/renderforest/service-auth.svg?branch=master)](https://travis-ci.org/renderforest/service-auth)
[![GitHub issues](https://img.shields.io/github/issues/renderforest/service-auth.svg)](https://github.com/renderforest/service-auth/issues)
[![GitHub release](https://img.shields.io/github/release/renderforest/service-auth.svg)](https://github.com/renderforest/service-auth/releases)
[![GitHub stars](https://img.shields.io/github/stars/renderforest/service-auth.svg)](https://github.com/renderforest/service-auth/stargazers)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![HitCount](http://hits.dwyl.com/renderforest/service-auth.svg)](http://hits.dwyl.com/renderforest/service-auth)
[![Maintained](https://img.shields.io/badge/maintained-%E2%9C%94-brightgreen.svg)](https://github.com/renderforest/service-auth)
[![Known Vulnerabilities](https://snyk.io/test/github/renderforest/service-auth/badge.svg)](https://snyk.io/test/github/renderforest/service-auth)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![Dep](https://img.shields.io/david/renderforest/service-auth.svg)](https://david-dm.org/renderforest/service-auth)
[![DevDep](https://img.shields.io/david/dev/renderforest/service-auth.svg)](https://david-dm.org/renderforest/service-auth?type=dev)

# Auth API

#### authorize()

  * Gets `signKey` from `req.__signKey`.
  * Generates hash from given parameters and signKey.
  * Compares generated hash with one from `headers.authorization`.
  * Might call `next()` with the `ServiceAuthError` error. Possible error messages:
    * `The 'signKey' is not found.`
    * `Invalid authorization key.`
 
  ``` javascript
     const AuthService = require('service-auth')
  
     router.post('/',
       // ... middleware to get signKey and set on req.__signKey
       AuthService.authorize,
      
       // ... more middlewares
       // handler
     )
  ```

#### setAuthorization(...)

  * Sets authorization.
  * Sets `nonce`, `clientid`, `timestamp`, `authorization` headers.
  * New options object is returned.
 
  ``` javascript
     const AuthService = require('service-auth')
   
     const initialOptions = {
        uri: 
        // ... lot more
        
        headers: {  // optional, defaults to {}  
          ...  
        }
     }
     const finalOptions = AuthService.setAuthorization(initialOptions, signKey, clientId),
  ```

  
# Development
In case you add new third party dependencies, use flow-typed npm package to add annotations for that packages.
 * npm i -g flow-typed
 * flow-typed install --ignoreDeps dev
