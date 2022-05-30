import { Request, Response, NextFunction } from 'express'
import { decrypt } from '../../../../lib/cryptr'
import { Admin } from '../../../../models/Admin'
import { AdminUtama } from '../../../../models/AdminUtama'

export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers
  try {
    const data = decrypt(key.authorization!)
    const [email, role] = data.split(':')
    if(role === 'admin' || role === 'admin-utama') {
      const isAdmin = await Admin.findOne({ email })
      if (isAdmin) next()
    }
    throw new Error()
  } catch (error) {
    res.status(403)
  }
}

export const authAdminUtama = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers
  try {
    const data = decrypt(key.authorization!)
    const [email, role] = data.split(':')
    if(role === 'admin-utama') {
      const isAdmin = await AdminUtama.findOne({ email })
      if (isAdmin) next()
    }
    throw new Error()
  } catch (error) {
    res.status(403)
  }
}
