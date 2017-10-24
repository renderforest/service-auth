'use strict'

const commonUtil = require('../../src/util/common')

describe('common util: ', () => {

  // Not covered case: options or key are undefined, because generateHash function caller can't give such argument.

  describe('_createHMAC(): ', () => {
    test('check if function is defined.', () => {
      expect(commonUtil.__test__._createHMAC).toBeDefined()
    })

    test('ordinary case.', () => {
      const text = 'mock-text'
      const key = 'mock-key'

      expect(commonUtil.__test__._createHMAC(text, key)).toBeDefined()
    })

    test('should be invalid. `text` is undefined. Should throw error.', () => {
      const text = undefined
      const key = 'mock-key'

      const createHMAC = () => {
        return commonUtil.__test__._createHMAC(text, key)
      }
      expect(createHMAC).toThrow('Data must be a string or a buffer')
    })

    test('should be invalid. `key` is undefined. Should throw error.', () => {
      const text = 'mock-test'
      const key = undefined

      const createHMAC = () => {
        return commonUtil.__test__._createHMAC(text, key)
      }
      expect(createHMAC).toThrow('Key must be a buffer')
    })
  })

  describe('generateHash(): ', () => {
    test('should be valid. Tests to be defined.', () => {
      expect(commonUtil.generateHash).toBeDefined()
    })

    test('should be valid. Generated hash should be string.', () => {
      const options = {
        clientId: 'mock-clientId',
        qs: 'mock-qs',
        path: 'mock-path',
        body: 'mock-body',
        nonce: 'mock-nonce',
        timestamp: 'mock-timestamp'
      }
      const key = 'mock-key'

      expect(typeof commonUtil.generateHash(options, key)).toBe('string')
    })
  })

  describe('generateNonce(): ', () => {
    test('should be valid. Tests to be defined.', () => {
      expect(commonUtil.generateNonce()).toBeDefined()
    })

    test('should be valid. Generated nonce should be string.', () => {
      expect(typeof commonUtil.generateNonce()).toBe('string')
    })
  })
})
