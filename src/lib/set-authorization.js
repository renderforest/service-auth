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
function setAuthorization (options, signKey, clientId) {
  const opts = Object.assign({}, options)

  const headers = opts.headers || {}
  headers.nonce = CommonUtil.generateNonce()
  headers.clientid = clientId
  headers.timestamp = Date.now()

  const { path, query } = url.parse(opts.uri)

  headers.authorization = CommonUtil.generateHash({
    clientId: clientId,
    path: path || '',
    qs: query || '',
    body: JSON.stringify(opts.body || {}),
    nonce: headers.nonce,
    timestamp: headers.timestamp
  }, signKey)

  opts.headers = headers
  return opts
}

module.exports = { setAuthorization }
