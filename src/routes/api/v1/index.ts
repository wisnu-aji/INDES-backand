import { Router } from 'express'
import searcRouter from './search'
import userRouter  from './user'
import { auth } from './middleware/auth'

const router = Router()
router.use('/search', searcRouter)
router.use('/user', auth, userRouter)
export default router
