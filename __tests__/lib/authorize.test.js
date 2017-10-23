const url = require('url')

const authorize = require('../../src/lib/authorize')
const CommonUtil = require('../../src/util/common')

describe('test authorize middleware', () => {
  test('where autoHash != hash', () => {
    const req = {
      headers: {
        authorization: 'mock-auth',
        clientid: 'mock-clientid',
        nonce: 'mock-nonce',
        timestamp: 'mock-timestamp'
      },
      __signKey: 'mock-signKey',
      originalUrl: 'https://mock.com',
      url: 'https://mock-mock.com',
      body: 'mock-body'
    }

    expect(authorize.authorize(req, undefined, (param) => param)).toEqual(Error('Invalid authorization key.'))
  })

  test('where autoHash == hash', () => {
    const qs = url.parse('https://mock-mock.com').query || ''
    const hash = CommonUtil.generateHash({
      clientId: 'mock-clientid',
      path: 'https://mock.com',
      qs: qs || '',
      body: JSON.stringify('mock-body' || {}),
      nonce: 'mock-nonce',
      timestamp: 'mock-timestamp'
    }, 'mock-signKey')
    const req = {
      headers: {
        authorization: hash,
        clientid: 'mock-clientid',
        nonce: 'mock-nonce',
        timestamp: 'mock-timestamp'
      },
      __signKey: 'mock-signKey',
      originalUrl: 'https://mock.com',
      url: 'https://mock-mock.com',
      body: 'mock-body'
    }

    expect(authorize.authorize(req, undefined, (param) => param)).toBe()
  })
})
