'use strict'

const crypto = require('crypto')

/**
 * @param {string} text
 * @param {string} key
 * @returns {string}
 * @private
 * @description Creates keyed-hash message authentication code (HMAC).
 *  Used core `crypto` module cryptographic hash function.
 *  Secret key - sha512.
 */
function _createHMAC (text, key) {
  return crypto.createHmac('sha512', key).update(text).digest('hex')
}

/**
 * @param {{clientId, qs, path, body, nonce, timestamp}} options
 * @param {string} key
 * @returns {string}
 * @description Generates HMAC based on source and key.
 *  Source is defined as combination of clientId, path, qs, body, nonce and timestamp respectively.
 */
function generateHash (options, key) {
  const clientId = options.clientId
  const qs = options.qs
  const path = options.path
  const body = options.body
  const nonce = options.nonce
  const timestamp = options.timestamp
  const hashSource = clientId + path + qs + body + nonce + timestamp

  return _createHMAC(hashSource, key)
}

/**
 * @returns {string}
 * @description Generates nonce.
 *  Creates timestamp
 *  Gets the last 6 chars of the timestamp
 *  Generates random number between 10-99
 *  Combined the last two ones.
 */
function generateNonce () {
  const timestamp = Date.now().toString()
  const str = timestamp.substring(timestamp.length - 6)
  const suffix = Math.floor(Math.random() * 90 + 9)

  return `${str}${suffix}`
}

module.exports = {
  generateHash,
  generateNonce,
  __test__: { _createHMAC }
}
