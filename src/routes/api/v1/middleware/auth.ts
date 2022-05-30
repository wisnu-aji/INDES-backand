import { Request, Response, NextFunction } from 'express'
import { decrypt } from '../../../../lib/cryptr'
import { Admin } from '../../../../models/Admin'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers
  try {
    const email = decrypt(key.authorization!)
    const isAdmin = await Admin.findOne({ email })
    if (isAdmin) next()
  } catch (error) {
    res.status(403)
  }
}
