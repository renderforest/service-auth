// @flow
'use strict'

/**
 * @param {object} options
 * @param {string} signKey
 * @param {string} clientId
 * @param {string} options.uri
 * @param {object} [options.headers = {}]
 * @returns {object} - New options object is returned.
 * @description Sets authorization(mocked).
 */
function setAuthorization(options, signKey, clientId) {
  const opts = Object.assign({}, options)

  opts.headers = opts.headers || {}
  opts.headers.nonce = 'nonce'
  opts.headers.clientid = clientId
  opts.headers.timestamp = 'date'

  opts.headers.authorization = signKey

  return opts
}

module.exports = { setAuthorization }
