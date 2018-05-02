# service-auth
Auth service to set authorization and authorize request.

[![Build Status](https://travis-ci.org/renderforest/service-auth.svg?branch=master)](https://travis-ci.org/renderforest/service-auth)

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
