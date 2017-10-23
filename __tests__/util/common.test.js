'use strict'

const commonUtil = require('../../src/util/common')

describe('_createHMAC function test.', () => {
  test('check if function is defined', () => {
    expect(commonUtil.__test__._createHMAC).toBeDefined()
  })

  test('ordinary case', () => {
    const text = 'mock-text'
    const key = 'mock-key'

    expect(commonUtil.__test__._createHMAC(text, key)).toBeDefined()
  })

  test('case where text is undefined', () => {
    const text = undefined
    const key = 'mock-key'

    const createHMAC = function() {
      return commonUtil.__test__._createHMAC(text, key)
    }
    expect(createHMAC).toThrow('Data must be a string or a buffer')
  })

  test('case where text is undefined', () => {
    const text = 'mock-test'
    const key = undefined

    const createHMAC = function() {
      return commonUtil.__test__._createHMAC(text, key)
    }
    expect(createHMAC).toThrow('Key must be a buffer')
  })
})

test('generateHash function test.', () => {
  const options = {
    clientId: 'mock-clientId',
    qs: '2',
    path: 'mock/path',
    body: 'mock-body',
    nonce: 'mock-nonce',
    timestamp: 'mock-213356'
  }
  const key = 'mock-key'

  expect(commonUtil.generateHash).toBeDefined()
  expect(commonUtil.generateHash(options, key)).toBeDefined()
})

test('generateNonce function test', () => {
  expect(commonUtil.generateNonce()).toBeDefined()
  expect(typeof commonUtil.generateNonce()).toBe('string')
})
