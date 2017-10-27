'use strict'

const urlModule = require('url')

const authorize = require('../../src/lib/authorize')
const CommonUtil = require('../../src/util/common')

describe('Test authorize middleware: ', () => {
  describe('authorize(): ', () => {
    test('should be invalid. `autoHash` is not equal to hash.', () => {
      const req = {
        headers: {
          authorization: 'mock-auth',
          clientid: 'mock-clientid',
          nonce: 'mock-nonce',
          timestamp: 'mock-timestamp'
        },
        __signKey: 'mock-signKey',
        originalUrl: 'mock-originalUrl',
        url: 'mock-url',
        body: 'mock-body'
      }

      expect(authorize.authorize(req, undefined, (param) => param)).toEqual('Invalid authorization key.')
    })

    test('should be valid. `autoHash` is equal hash.', () => {
      const url = 'https://mock.com'
      const clientId = 'mock-clientid'
      const nonce = 'mock-nonce'
      const body = 'mock-body'
      const timestamp = 'mock-timestamp'
      const signKey = 'mock-signKey'

      const qs = urlModule.parse(url).query || ''
      const hash = CommonUtil.generateHash({
        clientId,
        path: url,
        qs: qs || '',
        body: JSON.stringify(body || {}),
        nonce,
        timestamp
      }, signKey)
      const req = {
        headers: {
          authorization: hash,
          clientid: clientId,
          nonce,
          timestamp
        },
        __signKey: signKey,
        originalUrl: url,
        url,
        body
      }

      expect(authorize.authorize(req, undefined, (param) => param)).toBe()
    })
  })
})
