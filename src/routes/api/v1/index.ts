import { Router } from 'express'
import searcRouter from './search'
import userRouter from './user'
import adminRouter from './admin'
import paketRouter from './paket'
import bayarRouter from './bayar'
import { auth } from './middleware/auth'

const router = Router()
router.use('/search', auth, searcRouter)
router.use('/admin', auth, adminRouter)
router.use('/user', auth, userRouter)
router.use('/paket', paketRouter)
router.use('/bayar', bayarRouter)
export default router
