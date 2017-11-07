'use strict'

const urlModule = require('url')

const authorize = require('../../src/lib/authorize')
const CommonUtil = require('../../src/util/common')

const setAuthorization = require('../../src/lib/set-authorization')

describe('Test authorize middleware: ', () => {
  describe('authorize(): ', () => {
    test('should return `The `signKey` is not found.`. In case of `signKey` option is missing from req object', () => {
      const req = {}
      const expection = 'The `signKey` is not found.'

      authorize.authorize(req, undefined, (res) => {
        expect(res).toBe(expection)
      })
    })

    test('should return `Invalid authorization key.`. In case of `hash` is not equal to `authHash`.', () => {
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

      authorize.authorize(req, undefined, (res) => {
        expect(res).toEqual('Invalid authorization key.')
      })
    })

    test('should return `Invalid authorization key`. In case of `body` option is missing in from `req` object.', () => {
      const req = {
        headers: {
          authorization: 'mock-auth',
          clientid: 'mock-clientid',
          nonce: 'mock-nonce',
          timestamp: 'mock-timestamp'
        },
        __signKey: 'mock-signKey',
        originalUrl: 'mock-originalUrl',
        url: 'mock-url'
      }

      authorize.authorize(req, undefined, (res) => {
        expect(res).toEqual('Invalid authorization key.')
      })
    })

    test('should be undefined. In case of `authHash` is equal to hash.', () => {
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

      authorize.authorize(req, undefined, (res) => {
        expect(res).toBeUndefined()
      })
    })

    test('should return undefined. In case of setAuthorization passes authorize middleware.', () => {
      const options = {
        headers: {
          authorization: 'mock-auth',
          clientid: 'mock-clientid',
          nonce: 'mock-nonce',
          timestamp: 'mock-timestamp'
        },
        __signKey: 'mock-signKey',
        originalUrl: '/',
        uri: 'https://mock.com',
        body: 'mock-body'
      }

      const signKey = 'mock-signKey'
      const clientId = 'mock-clientid'
      const setAuth = setAuthorization.setAuthorization(options, signKey, clientId)
      setAuth.__signKey = signKey
      setAuth.url = 'https://mock.com'

      authorize.authorize(setAuth, undefined, (res) => {
        expect(res).toBeUndefined()
      })
    })
  })
})
