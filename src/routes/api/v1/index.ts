import { Router } from 'express'
import searcRouter from './search'
import userRouter from './user'
import adminRouter from './admin'
import { auth } from './middleware/auth'

const router = Router()
router.use('/search', auth, searcRouter)
router.use('/admin', auth, adminRouter)
router.use('/user', auth, userRouter)
export default router
