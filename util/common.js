'use strict'

const crypto = require('crypto')

/**
 * @param {{qs, path, body, nonce, timestamp}} options
 * @param {string} key
 * @returns {string}
 * @description Generates HMAC based on source and key.
 *  Source is defined as combination of path, qs, body, nonce and timestamp respectively.
 */
function generateHash (options, key) {
  const qs = options.qs
  const path = options.path
  const body = options.body
  const nonce = options.nonce
  const timestamp = options.timestamp
  const hashSource = path + qs + body + nonce + timestamp

  return createHMAC(hashSource, key)
}

/**
 * @param {string} text
 * @param {string} key
 * @returns {string}
 * @description Creates keyed-hash message authentication code (HMAC).
 *  Used core `crypto` module cryptographic hash function.
 *  Secret key - sha512.
 */
function createHMAC (text, key) {
  return crypto.createHmac('sha512', key).update(text).digest('hex')
}

module.exports = {generateHash, createHMAC}
