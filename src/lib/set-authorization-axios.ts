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
  const nonce = CommonUtil.generateNonce()
  const timestamp = new Date().toISOString()
  const url = URL.canParse(config.url ?? '') ? new URL(config.url ?? '') : null
  const path = url?.pathname || ''
  const qs = url?.search.slice(1) || ''

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
