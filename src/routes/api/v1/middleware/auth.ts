import { Request, Response, NextFunction } from 'express'

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.headers
  // Handling cookie here
  console.log(key)

  next()
}
