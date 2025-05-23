import { Request as ExpressRequest } from 'express'

export interface Request extends ExpressRequest<Record<string, string>, unknown, unknown> {
  __signKey?: string
}

export { Response, NextFunction } from 'express'
