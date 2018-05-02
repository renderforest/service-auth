const setAuthorization = require('../../src/lib/set-authorization')

describe('set authorization: ', () => {
  describe('setAuthorization(): ', () => {
    test('should be valid (ordinary case).', () => {
      const options = {
        headers: {},
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

    test('should be valid. Checks for other headers not to be overwritten.', () => {
      const options = {
        headers: {
          other: 'mock-other'
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
      expect(setAuth.headers.other).toBe(options.headers.other)
    })

    test('should be valid. In case of `headers` is missing from `options` object.', () => {
      const options = {
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

    test('should be valid. In case of `body` is missing from `options` object.', () => {
      const options = {
        uri: 'https://mock-mock.com'
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

    test('should be valid. In case of `path` is fallsy.', () => {
      const options = {
        uri: 'https://'
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

    test('should be valid. In case of presence of query in `uri`.', () => {
      const options = {
        uri: 'https://mock-mock.com?mock=mock-value',
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
