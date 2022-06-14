import { Admin } from '../../../models/Admin'
import { Router } from 'express'
import { generateURL } from '../../../lib/google/oauth'
import { AdminType } from 'indes-typings'

const router = Router()

router.post('/add', async (req, res) => {
  const data = req.body
  const admin = new Admin(data)
  const result = await admin.save()

  res.json(result)
})

router.post('/edit', async (req, res) => {
  try {
    const data = req.body as AdminType
    const result = await Admin.findByIdAndUpdate(data._id, data)
    if (!result) return res.status(404).json({ message: 'Not found' })
    res.json(result)
  } catch (error: unknown) {
    const e = error as Error
    res.status(500).json({ message: e.message })
  }
})

router.delete('/delete', async (req, res) => {
  try {
    const data = req.body as AdminType
    const result = await Admin.findByIdAndDelete(data._id)
    if (!result) return res.status(404).json({ message: 'Not found' })
    res.json(result)
  } catch (error: unknown) {
    const e = error as Error
    res.status(500).json({ message: e.message })
  }
})

interface AdminSearch {
  page: number
  limit: number
  query: string
}

router.post('/list', async (req, res) => {
  try {
    const data = req.body as AdminSearch
    const { query } = data
    const payload = query
      ? {
          $or: [
            { nama: { $regex: new RegExp(query, 'i') } },
            { email: { $regex: new RegExp(query, 'i') } },
          ],
        }
      : {}
    const total = await Admin.find(payload).countDocuments()

    const list = await Admin.find(payload)
      .skip((+data.page - 1) * data.limit)
      .limit(data.limit)
    res.json({ list, total })
  } catch (error: unknown) {
    const e = error as Error
    res.status(500).json({ message: e.message })
  }
})

router.get('/oauth', (req, res) => {
  res.redirect(generateURL())
})

export default router
