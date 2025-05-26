/**
 * Custom error for service authentication failures
 */
export class ServiceAuthError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ServiceAuthError'
  }
}
