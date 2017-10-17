# service-auth
Auth service to set authorization and authorize request.

## Auth API

#### authorize()

  * Gets *signKey* from *req.__signKey*.
  * Generates hash from given parameters and signKey.
  * Compares generated hash with one from *headers.authorization*.
 
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
  * New options object is returned or null if signKey is not present.
 
  ``` javascript
     const AuthService = require('service-auth')
   
     const initialOptions = {
        uri: 
        // ... lot more
        
        
        signKey:  // optional, defaults to process.env.SIGN_KEY
        headers: {  // optional, defaults to {}
          nonce:  // optional, defaults to ''
          userid:  // optional, defaults to process.env.WORKER_ID
          timestamp:  // optional, defaults to Date.now()
          
        }
     }
     const finalOptions = AuthService.setAuthorization(initialOptions),
  ```
