import { Request, Response, NextFunction } from 'express'
import { decrypt } from '../../../../lib/cryptr'
import { Admin } from '../../../../models/Admin'
import { AdminUtama } from '../../../../models/AdminUtama'

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.headers
  if (process.env.NODE_ENV === 'development') {
    next()
    return
  }
  try {
    const data = decrypt(key.authorization!)
    const [email, role, expiry] = data.split(':')

    if (+expiry < Date.now()) {
      return res.status(401).json({
        message: 'Token expired',
      })
    }
    console.log(email, role)
    if (role === 'admin') {
      const isAdmin = await Admin.findOne({ email })
      if (isAdmin) return next()
    }
    if (role === 'admin-utama') {
      const isAdminUtama = await AdminUtama.findOne({ email })
      if (isAdminUtama) return next()
    }
    throw new Error()
  } catch (error) {
    res.sendStatus(403)
  }
}

export const authAdminUtama = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.headers
  try {
    const data = decrypt(key.authorization!)
    const [email, role] = data.split(':')
    if (role === 'admin-utama') {
      const isAdmin = await AdminUtama.findOne({ email })
      if (isAdmin) next()
    }
    throw new Error()
  } catch (error) {
    res.sendStatus(403)
  }
}
export const authXendit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const callbackToken = req.header('x-callback-token')
    if (!callbackToken) throw new Error()
    const isCorrect = callbackToken === process.env.XENDIT_CALLBACK_TOKEN
    if (!isCorrect) throw new Error()
    next()
  } catch (error) {
    res.sendStatus(403)
  }
}

export const authIpaymu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body
    if (!body.reference_id) throw new Error()
    
    const data = decrypt(body.reference_id)
    if (!data) throw new Error()

    req.body.reference_id = data
    next()
  } catch (error) {
    res.sendStatus(403).send()
  }
}
