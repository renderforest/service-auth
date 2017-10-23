'use strict'

const setAuthorization = require('../../src/lib/set-authorization')

describe('setAuthorization function test: ', () => {
  test('should be valid(ordinary case).', () => {
    const options = {
      headers: {
        authorization: 'mock-auth',
        nonce: 'mock-nonce'
      },
      uri: 'https://mock-mock.com',
      body: 'mock-body'
    }
    const signKey = 'mock-signKey'
    const clientid = 'mock-clientid'
    const setAuth = setAuthorization.setAuthorization(options, signKey, clientid)

    expect(typeof setAuth).toBe('object')
    expect(setAuth.headers.nonce).toBeDefined()
    expect(setAuth.headers.clientid).toBe(clientid)
    expect(setAuth.headers.timestamp).toBeDefined()
    expect(setAuth.headers.authorization).toBeDefined()
  })
})
