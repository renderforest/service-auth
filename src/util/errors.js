class ServiceAuthError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'ServiceAuthError'
  }
}

module.exports = { ServiceAuthError }
