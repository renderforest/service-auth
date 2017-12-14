// @flow
'use strict'

const url = require('url')

const CommonUtil = require('../util/common')

/**
 * @param {object} options
 * @param {string} signKey
 * @param {string} clientId
 * @param {string} options.uri
 * @param {object} [options.headers = {}]
 * @returns {object} - New options object is returned.
 * @description Sets authorization.
 *  Sets nonce, clientid, timestamp, authorization headers.
 */
function setAuthorization (options: TSetAuthorizationOptions, signKey: string, clientId: string): Object {
  const opts = Object.assign({}, options)

  opts.headers = opts.headers || {}
  opts.headers.nonce = CommonUtil.generateNonce()
  opts.headers.clientid = clientId
  opts.headers.timestamp = Date.now()

  const { path, query } = url.parse(opts.uri)

  opts.headers.authorization = CommonUtil.generateHash({
    clientId: clientId,
    path: path || '',
    qs: query || '',
    body: JSON.stringify(opts.body || {}),
    nonce: opts.headers.nonce,
    timestamp: opts.headers.timestamp
  }, signKey)

  return opts
}

module.exports = { setAuthorization }
