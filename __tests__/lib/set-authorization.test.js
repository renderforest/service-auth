'use strict'

const setAuthorization = require('../../src/lib/set-authorization')

describe('set authorization: ', () => {
  describe('setAuthorization(): ', () => {
    test('should be valid (ordinary case).', () => {
      const options = {
        headers: {
          authorization: 'mock-auth',
          nonce: 'mock-nonce'
        },
        uri: 'https://mock-mock.com',
        body: 'mock-body'
      }
      const signKey = 'mock-signKey'
      const clientId = 'mock-clientid'
      const setAuth = setAuthorization.setAuthorization(options, signKey, clientId)

      expect(typeof setAuth).toBe('object')
      expect(setAuth.headers.nonce).toBeDefined()
      expect(setAuth.headers.clientid).toBe(clientId)
      expect(setAuth.headers.timestamp).toBeDefined()
      expect(setAuth.headers.authorization).toBeDefined()
    })
  })
})
