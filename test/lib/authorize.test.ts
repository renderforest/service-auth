import { authorize } from '../../src'
import { Request, Response, NextFunction } from '../../src/types/express'
import CommonUtil from '../../src/util/common'
import { setAuthorization, RequestOptions } from '../../src/lib/set-authorization'

describe('Test authorize middleware: ', () => {
  describe('authorize(): ', () => {
    test('should return `The `signKey` is not found.`. In case of `signKey` option is missing from req object', () => {
      const req = {} as Request
      const res = {} as Response
      const next = jest.fn() as NextFunction

      authorize(req, res, next)

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        name: 'ServiceAuthError',
        message: 'The `signKey` is not found.'
      }))
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
        originalUrl: '/path',
        body: 'mock-body'
      } as unknown as Request

      const next = jest.fn() as NextFunction
      authorize(req, {} as Response, next)

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        name: 'ServiceAuthError',
        message: 'Invalid authorization key.'
      }))
    })

    test('should return `Invalid authorization key`. In case of `body` option is missing in `req` object.', () => {
      const req: Request = {
        headers: {
          authorization: 'mock-auth',
          clientid: 'mock-clientid',
          nonce: 'mock-nonce',
          timestamp: 'mock-timestamp'
        },
        __signKey: 'mock-signKey',
        originalUrl: '/path'
      } as unknown as Request

      const next = jest.fn() as NextFunction
      authorize(req, {} as Response, next)

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        name: 'ServiceAuthError',
        message: 'Invalid authorization key.'
      }))
    })

    test('should return `Invalid authorization key`. In case of `originalUrl` is missing in `req` object.', () => {
      const req: Request = {
        headers: {
          authorization: 'mock-auth',
          clientid: 'mock-clientid',
          nonce: 'mock-nonce',
          timestamp: 'mock-timestamp'
        },
        __signKey: 'mock-signKey',
        body: 'mock-body'
      } as unknown as Request

      const next = jest.fn() as NextFunction
      authorize(req, {} as Response, next)

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        name: 'ServiceAuthError',
        message: 'Invalid authorization key.'
      }))
    })

    test('should be undefined. In case of `authHash` is equal to hash.', () => {
      const url = 'https://mock.com/path'
      const clientId = 'mock-clientid'
      const nonce = 'mock-nonce'
      const body = 'mock-body'
      const timestamp = 'mock-timestamp'
      const signKey = 'mock-signKey'

      const parsedUrl = new URL(url)
      const path = parsedUrl.pathname || ''
      const qs = parsedUrl.search.slice(1) || ''

      const hash = CommonUtil.generateHash({
        clientId,
        path,
        qs,
        body: JSON.stringify(body),
        nonce,
        timestamp
      }, signKey)

      const req: Request = {
        headers: {
          authorization: hash,
          clientid: clientId,
          nonce,
          timestamp
        },
        __signKey: signKey,
        originalUrl: new URL(url).pathname,
        body
      } as unknown as Request

      const next = jest.fn() as NextFunction
      authorize(req, {} as Response, next)

      expect(next).toHaveBeenCalledWith()
    })

    test('should return undefined. In case of setAuthorization passes authorize middleware.', () => {
      const options: RequestOptions = {
        headers: {
          clientid: 'mock-clientid',
          nonce: 'mock-nonce',
          timestamp: 'mock-timestamp'
        },
        uri: 'https://mock.com/path',
        body: 'mock-body'
      }

      const signKey = 'mock-signKey'
      const clientId = 'mock-clientid'
      const finalOptions = setAuthorization(options, signKey, clientId) as unknown as Request

      finalOptions.__signKey = signKey
      finalOptions.originalUrl = options.uri.match(/https?:\/\/.+?(\/.+)/)?.[1] || ''

      const next = jest.fn() as NextFunction
      authorize(finalOptions, {} as Response, next)

      expect(next).toHaveBeenCalledWith()
    })

    test('should return undefined. In case of setAuthorization passes authorize middleware (present query in uri).', () => {
      const options: RequestOptions = {
        headers: {
          clientid: 'mock-clientid',
          nonce: 'mock-nonce',
          timestamp: 'mock-timestamp'
        },
        uri: 'https://mock.com/path?mock=mock-value',
        body: 'mock-body'
      }

      const signKey = 'mock-signKey'
      const clientId = 'mock-clientid'
      const finalOptions = setAuthorization(options, signKey, clientId) as unknown as Request

      finalOptions.__signKey = signKey
      finalOptions.originalUrl = options.uri.match(/https?:\/\/.+?(\/.+)/)?.[1] || ''

      const next = jest.fn() as NextFunction
      authorize(finalOptions, {} as Response, next)

      expect(next).toHaveBeenCalledWith()
    })
  })
})
