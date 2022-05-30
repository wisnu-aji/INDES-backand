import { Router } from 'express'
import searcRouter from './search'
import userRouter from './user'
import adminRouter from './admin'
import paketRouter from './paket'
import bayarRouter from './bayar'
import { authAdmin, authAdminUtama } from './middleware/auth'

const router = Router()

router.use('/admin', authAdminUtama, adminRouter)

router.use('/user', authAdmin, userRouter)

router.use('/search', searcRouter)
router.use('/paket', paketRouter)
router.use('/bayar', bayarRouter)
export default router
