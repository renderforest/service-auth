import { Request, Response, NextFunction } from '../types/express'

import CommonUtil from '../util/common'
import { ServiceAuthError } from '../util/errors'

const getHeader = (req: Request, header: string): string => {
  const value = req.headers[header.toLowerCase()]
  if (Array.isArray(value)) {
    return value.join(',')
  }
  return value || ''
}

export function authorize (req: Request, res: Response, next: NextFunction): void {
  if (!req.__signKey) {
    next(new ServiceAuthError('The `signKey` is not found.'))
    return
  }

  const clientId = getHeader(req, 'clientid')
  const nonce = getHeader(req, 'nonce')
  const timestamp = getHeader(req, 'timestamp')
  const base = 'https://renderforest.com' // Use a base URL for URL parsing
  const url = req.originalUrl || ''
  const parsedUrl = URL.canParse(url, base) ? new URL(url, base) : null
  const path = parsedUrl?.pathname || ''
  const qs = parsedUrl?.search.slice(1) || ''
  const body = req.body || {}

  const hash = CommonUtil.generateHash({
    clientId,
    path,
    qs: qs || '',
    body: JSON.stringify(body),
    nonce,
    timestamp
  }, req.__signKey)

  const authHash = req.headers.authorization

  if (hash !== authHash) {
    next(new ServiceAuthError('Invalid authorization key.'))
    return
  }

  next()
}
