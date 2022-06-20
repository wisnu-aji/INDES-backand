import { Paket } from '../../../models/Paket'
import { Router } from 'express'
import { authAdminUtama } from './middleware/auth'

const router = Router()
router.get('/', async (req, res) => {
  try {
    const data = await Paket.find()
    res.json(data)
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message })
  }
})
router.post('/add', authAdminUtama, async (req, res) => {
  try {
    const data = req.body

    const paket = new Paket(data)
    const result = await paket.save()

    res.json(result)
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message })
  }
})
router.patch('/edit', authAdminUtama, async (req, res) => {
  try {
    const data = req.body
    const result = await Paket.findByIdAndUpdate(data._id, data)
    res.json(result)
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

router.delete('/delete', authAdminUtama, async (req, res) => {
  try {
    const data = req.body
    const result = await Paket.findByIdAndDelete(data._id)
    res.json(result)
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const paket = await Paket.findById(Number(id))
    if (!paket) {
      res.status(404).json({ ok: false, message: 'paket tidak ditemukan' })
      return
    }

    res.json(paket)
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

export default router
