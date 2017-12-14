// @flow
'use strict'

class ServiceAuthError extends Error {
  constructor (msg: string) {
    super(msg)
    this.name = 'ServiceAuthError'
  }
}

module.exports = { ServiceAuthError }
