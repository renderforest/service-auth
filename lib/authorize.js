'use strict'

const url = require('url')

const CommonUtil = require('../util/common')

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {*}
 * @description Middleware to authorize the request.
 *  Gets signKey from req.__signKey.
 *  Generates hash from given parameters and signKey.
 *  Compares generated hash with one from headers.authorization.
 */
function authorize (req, res, next) {
  const authHash = req.headers['authorization'] || 0
  const signKey = req.__signKey

  const hash = CommonUtil.generateHash({
    clientId: req.headers.clientid,
    path: req.originalUrl,
    qs: url.parse(req.url).query || '',
    body: JSON.stringify(req.body || {}),
    nonce: req.headers.nonce,
    timestamp: req.headers.timestamp
  }, signKey)

  if (hash === authHash) { return next() } else { return next(Error('Invalid authorization key!')) }
}

module.exports = {authorize}
