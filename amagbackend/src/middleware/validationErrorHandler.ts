import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

export default (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === 'ValidationError') {
    if (process.env.NODE_ENV === 'production') {
      return res.status(400).json(error.details[0].message)
    } else {
      return res.status(400).json(error)
    }
  }
  next(error)
}
