'use strict'

const queryString = require('querystring')
const url = require('url')

const CommonUtil = require('../util/common')

/**
 * @param {object} options
 * @param {string} options.uri
 * @param {string} [options.signKey = [process.env.SIGN_KEY, null]]
 * @param {object} [options.headers = {}]
 * @param {string} [options.headers.nonce = '']
 * @param {string} [options.headers.userid = process.env.WORKER_ID]
 * @param {string} [options.headers.timestamp =  Date.now()]
 * @returns {object | null} - New options object is returned or null if signKey is not present.
 * @description Sets authorization.
 *  Reads `SIGN_KEY` from process.env if not specified.
 *  Reads `WORKER_ID` from process.env if userid is not specified.
 */
function setAuthorization (options) {
  const opts = Object.assign({}, options)

  const signKey = opts.signKey || process.env.SIGN_KEY || null
  if (!signKey) {
    return null
  }

  opts.headers = opts.headers || {}
  opts.headers.nonce = opts.headers.nonce || ''
  opts.headers.userid = opts.headers.userid || process.env.WORKER_ID
  opts.headers.timestamp = opts.headers.timestamp || Date.now()

  const {path, query = ''} = url.parse(opts.uri)
  const hashSource = opts.headers['userid'] + path + opts.headers.timestamp + opts.headers.nonce +
    JSON.stringify(opts.body || {}) + queryString.stringify(query)

  opts.headers.authorization = CommonUtil.createHMAC(hashSource, signKey)

  return opts
}

module.exports = {setAuthorization}
