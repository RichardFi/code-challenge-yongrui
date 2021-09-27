import { Request, Response, NextFunction } from 'express'
import { HttpError } from "http-errors";

const logger = require('../config/winston')

export default (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.err(error)
  return res
    .status(500)
    .send('something bad happened at our side, please tyr again later')
}
