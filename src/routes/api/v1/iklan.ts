import { Router } from 'express'
import { Iklan } from '../../../models/Iklan'
import { authAdmin } from './middleware/auth'

const router = Router()

router.get('/', async (req, res) => {
  const data = await Iklan.find()
  res.json(data)
})

router.post('/add', authAdmin, async (req, res) => {
  try {
    const data = req.body
    const iklan = new Iklan(data)
    const result = await iklan.save()
    res.json(result)
  } catch (error: unknown) {
    const e = error as Error
    res.status(500).json({ message: e.message })
  }
})
router.put('/edit', authAdmin, async (req, res) => {
  try {
    const data = req.body
    const iklan = await Iklan.findByIdAndUpdate(data._id, data)
    if (!iklan) return res.status(404).json({ message: 'Not found' })
    res.json(iklan)
  } catch (error: unknown) {
    const e = error as Error
    res.status(500).json({ message: e.message })
  }
})
router.delete('/delete', authAdmin, async (req, res) => {
  try {
    const data = req.body
    const result = await Iklan.findByIdAndDelete(data._id)
    if (!result) return res.status(404).json({ message: 'Not found' })
    res.json(result)
  } catch (error: unknown) {
    const e = error as Error
    res.status(500).json({ message: e.message })
  }
})

interface IklanSearch {
  page: number
  limit: number
  query: string
}

router.post('/list', async (req, res) => {
  try {
    const data = req.body as IklanSearch
    const { query } = data
    const payload = query
      ? {
          $or: [
            { nama_iklan: { $regex: new RegExp(query, 'i') } },
            { gambar: { $regex: new RegExp(query, 'i') } },
          ],
        }
      : {}
    const total = await Iklan.find(payload).countDocuments()

    const list = await Iklan.find(payload)
      .skip((+data.page - 1) * data.limit)
      .limit(data.limit)
    res.json({ list, total })
  } catch (error: unknown) {
    const e = error as Error
    res.status(500).json({ message: e.message })
  }
})
export default router
