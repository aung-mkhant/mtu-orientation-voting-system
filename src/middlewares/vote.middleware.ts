import type { Request, Response, NextFunction } from 'express'

import { getVotingStatus } from '../config/settings.js'

const checkVotingStatus = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.isVotingOpen = getVotingStatus()
  next()
}

export default checkVotingStatus
