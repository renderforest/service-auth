'use strict'

const commonUtil = require('../../src/util/common')

test('_createHMAC function test.', () => {
  expect(commonUtil.__test__._createHMAC).toBeDefined()

  const text = 'text'
  const key = 'key'
  const hmac = 'b585312acdd38ec13f13bb4cba35a75473f32b6ae4a0303926815bd43d7a2631516b2b031f34d89eda853e948d5057de54a880c16697242dbe6a1ad994bc4e5d'

  expect(commonUtil.__test__._createHMAC(text, key)).toBe(hmac)
})

test('generateHash function test.', () => {
  const options = {
    clientId: '1',
    qs: '2',
    path: 'kdkf/ddsf',
    body: 'sdfdfsdg',
    nonce: 'dsfsdf',
    timestamp: '213356'
  }
  const key = 'key'
  const hash = '770fc5d7519576939b5955114353374a8018e4d7caa4f05b89d0869c46749f518c3d585c10cc1d4090ac320ccff742bfacd19a6d1311cf06dcd27a5d07f17179'

  expect(commonUtil.generateHash).toBeDefined()
  expect(commonUtil.generateHash(options, key)).toBe(hash)
})

test('generateNonce function test', () => {
  expect(commonUtil.generateNonce()).toBeDefined()
})
