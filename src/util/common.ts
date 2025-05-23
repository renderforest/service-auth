import crypto from 'crypto'

export interface HashOptions {
  clientId: string;
  path: string;
  qs: string;
  body: string;
  nonce: string;
  timestamp: string;
}

function _createHMAC (text: string, key: string): string {
  return crypto.createHmac('sha512', key).update(text).digest('hex')
}

export function generateHash (options: HashOptions, key: string): string {
  const text = `${options.clientId}${options.path}${options.qs}${options.body}${options.nonce}${options.timestamp}`
  return _createHMAC(text, key)
}

export function generateNonce (): string {
  return Math.random().toString(36).substring(2)
}

export const __test__ = {
  _createHMAC
}

export default {
  generateHash,
  generateNonce,
  __test__
}
