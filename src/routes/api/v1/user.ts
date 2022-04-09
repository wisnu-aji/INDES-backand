import { Router } from 'express'
import { PelangganType, User } from 'indes-typings'
import { addNewUser } from '../../../lib/addNewUser'
import { getBatasPembayaran } from '../../../lib/getBatasPembayaran'
import { Pelanggan } from '../../../models/Pelanggan'
const router = Router()

router.post('/add', async (req, res) => {
  try {
    const body = req.body as User
    body.batasPembayaran = getBatasPembayaran(
      new Date(body.pemasangan),
      new Date(body.pemasangan).getDate()
    )
    console.log(req.body)
    const save = await addNewUser(body)
    if (typeof save === 'string') throw new Error(save)
    res.json(save)
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

router.post('/edit', async (req, res) => {
  try {
    const body = req.body as PelangganType
    const updated = await Pelanggan.findByIdAndUpdate(body._id, body)
    res.json(updated)
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

router.post('/remove', async (req, res) => {
  try {
    const body = req.body as PelangganType
    const updated = await Pelanggan.findByIdAndRemove(body._id)
    res.json(updated)
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

export default router
