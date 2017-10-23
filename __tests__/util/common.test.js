'use strict'

const commonUtil = require('../../src/util/common')

describe('_createHMAC function test: ', () => {
  // Not handled case where options or key are undefined, because generateHash function caller can't give such argument.  
  test('check if function is defined.', () => {
    expect(commonUtil.__test__._createHMAC).toBeDefined()
  })

  test('ordinary case.', () => {
    const text = 'mock-text'
    const key = 'mock-key'

    expect(commonUtil.__test__._createHMAC(text, key)).toBeDefined()
  })

  test('case where text is undefined.', () => {
    const text = undefined
    const key = 'mock-key'

    const createHMAC = () => {
      return commonUtil.__test__._createHMAC(text, key)
    }
    expect(createHMAC).toThrow('Data must be a string or a buffer')
  })

  test('case where text is undefined.', () => {
    const text = 'mock-test'
    const key = undefined

    const createHMAC = () => {
      return commonUtil.__test__._createHMAC(text, key)
    }
    expect(createHMAC).toThrow('Key must be a buffer')
  })
})

test('generateHash function test.', () => {
  const options = {
    clientId: 'mock-clientId',
    qs: 'mock-qs',
    path: 'mock-path',
    body: 'mock-body',
    nonce: 'mock-nonce',
    timestamp: 'mock-timestamp'
  }
  const key = 'mock-key'

  expect(commonUtil.generateHash).toBeDefined()
  expect(commonUtil.generateHash(options, key)).toBeDefined()
})

test('generateNonce function test.', () => {
  expect(commonUtil.generateNonce()).toBeDefined()
  expect(typeof commonUtil.generateNonce()).toBe('string')
})
