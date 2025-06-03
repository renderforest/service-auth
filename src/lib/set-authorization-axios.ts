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
  const baseURL = (config.baseURL ?? '').replace(/\/+$/, '') // Remove trailing slashes
  const url = (config.url ?? '').replace(/^\/+/, '') // Remove leading slashes
  const fullUrl = `${baseURL}/${url}`.replace(/^\/+/, '')
  const urlParsed = URL.canParse(fullUrl) ? new URL(fullUrl) : null

  if (config.params && urlParsed) {
    const params = config.params as Record<string, string | readonly string[]>
    const paramsSerializer = typeof config.paramsSerializer === 'function' ? config.paramsSerializer : config.paramsSerializer?.serialize

    const queryString = new URLSearchParams(
      paramsSerializer?.(params) ?? params
    )
    queryString.forEach((value, key) => {
      urlParsed.searchParams.append(key, value)
    })
  }

  const nonce = CommonUtil.generateNonce()
  const timestamp = new Date().toISOString()
  const qs = urlParsed?.search.slice(1) || ''
  const path = `${urlParsed?.pathname || ''}${urlParsed?.search || ''}`

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
