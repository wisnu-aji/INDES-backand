import { Admin } from '../../../models/Admin'
import { Router } from 'express'
import { generateURL } from '../../../lib/google/oauth'

const router = Router()

router.post('/add', async (req, res) => {
  const data = req.body
  const admin = new Admin(data)
  const result = await admin.save()

  res.json(result)
})
router.get('/oauth', (req, res) => {
  res.redirect(generateURL())
})


export default router
