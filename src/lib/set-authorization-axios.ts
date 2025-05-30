import { InternalAxiosRequestConfig } from 'axios'
import CommonUtil from '../util/common'

export function setAuthorizationAxios ({
  config,
  signKey,
  clientId
}: {
  config: InternalAxiosRequestConfig
  signKey: string
  clientId: string
}) {
  const queryString = config.params
    ? new URLSearchParams(config.params as Record<string, string | readonly string[]>).toString()
    : ''
  const baseURL = (config.baseURL ?? '').replace(/\/+$/, '') // Remove trailing slashes
  const url = (config.url ?? '').replace(/^\/+/, '') // Remove leading slashes
  const fullUrl = `${baseURL}/${url}?${queryString}`.replace(/^\/+/, '')

  const nonce = CommonUtil.generateNonce()
  const timestamp = new Date().toISOString()
  const urlParsed = URL.canParse(fullUrl) ? new URL(fullUrl) : null
  const path = urlParsed?.pathname || ''
  const qs = urlParsed?.search.slice(1) || ''

  const hash = CommonUtil.generateHash(
    {
      clientId,
      path,
      qs,
      body: typeof config.data !== 'string' ? JSON.stringify(config.data || {}) : config.data,
      nonce,
      timestamp
    },
    signKey
  )

  config.headers.authorization = hash
  config.headers.clientid = clientId
  config.headers.nonce = nonce
  config.headers.timestamp = timestamp
}
