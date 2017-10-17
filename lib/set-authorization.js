'use strict'

const queryString = require('querystring')
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
 *  Sets nonce, clientId, timestamp, authorization headers.
 */
function setAuthorization (options, signKey, clientId) {
  const opts = Object.assign({}, options)

  opts.headers = opts.headers || {}
  opts.headers.nonce = CommonUtil.generateNonce()
  opts.headers.clientId = clientId
  opts.headers.timestamp = Date.now()

  const {path, query = ''} = url.parse(opts.uri)
  const hashSource = opts.headers.clientId + path + opts.headers.timestamp + opts.headers.nonce +
    JSON.stringify(opts.body || {}) + queryString.stringify(query)

  opts.headers.authorization = CommonUtil.createHMAC(hashSource, signKey)

  return opts
}

module.exports = {setAuthorization}
