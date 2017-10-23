const setAuthorization = require('../../src/lib/set-authorization')

test('setAuthorization function test', () => {
  const options = {
    headers: {
      authorization: 'mock-auth',
      nonce: 'mock-nonce'
    },
    uri: 'https://mock-mock.com',
    body: 'mock-body'
  }
  const signKey = 'mock-signKey'
  const clientid = 'mock'

  expect(typeof setAuthorization.setAuthorization(options, signKey, clientid)).toBe('object')
  expect(setAuthorization.setAuthorization(options, signKey, clientid).headers.nonce).toBeDefined()
  expect(setAuthorization.setAuthorization(options, signKey, clientid).headers.clientid).toBe('mock')
  expect(setAuthorization.setAuthorization(options, signKey, clientid).headers.timestamp).toBeDefined()
  expect(setAuthorization.setAuthorization(options, signKey, clientid).headers.authorization).toBeDefined()
})
