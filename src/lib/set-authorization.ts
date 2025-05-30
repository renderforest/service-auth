import CommonUtil from '../util/common'

export interface RequestOptions {
  headers?: Record<string, string>
  uri: string
  body?: unknown
  [key: string]: unknown
}

export function setAuthorization<T extends RequestOptions> (options: T, signKey: string, clientId: string): T {
  const nonce = CommonUtil.generateNonce()
  const timestamp = new Date().toISOString()
  const url = URL.canParse(options.uri) ? new URL(options.uri) : null
  const qs = url?.search.slice(1) || ''
  const path = `${url?.pathname || ''}${url?.search || ''}`

  // Create a deep copy of the options to avoid modifying the original
  const result = structuredClone(options)

  if (!result.headers) {
    result.headers = {}
  }

  const hash = CommonUtil.generateHash(
    {
      clientId,
      path,
      qs,
      body: JSON.stringify(result.body || {}),
      nonce,
      timestamp
    },
    signKey
  )

  result.headers.authorization = hash
  result.headers.clientid = clientId
  result.headers.nonce = nonce
  result.headers.timestamp = timestamp

  return result
}
