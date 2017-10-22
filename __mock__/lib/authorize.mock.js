// @flow
"use strict"

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {*}
 * @description Middleware to authorize the request(mocked).
 */
function authorize(req, res, next) {
  const authHash = req.headers["authorization"] || 0

  const hash = "hash"

  if (hash === authHash) {
    return next("done")
  } else {
    return next(Error("Invalid authorization key!"))
  }
}

module.exports = { authorize }
