import { Request, Response, NextFunction } from 'express'

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.header('set-cookie')

  // Handling cookie here

  next()
}
