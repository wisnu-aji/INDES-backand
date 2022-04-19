import { Router } from 'express'
import { buatSignature } from '../../../lib/buatSignature'
import { linkBayar } from '../../../lib/linkBayar'
import { Paket } from '../../../models/Paket'
import { Pelanggan } from '../../../models/Pelanggan'

const router = Router()

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!id) {
    res.status(401).json({ ok: false, message: 'id is invalid' })
    return
  }

  const pelanggan = await Pelanggan.findById(id)
  if (!pelanggan) {
    res.status(404).json({ ok: false, message: 'pelanggan tidak ditemukan' })
    return
  }

  const paket = await Paket.findById(pelanggan.paket)
  if (!paket) {
    res.status(404).json({
      ok: false,
      message: 'paket ' + pelanggan.paket + ' tidak ditemukan',
    })
    return
  }

  const bayar = await linkBayar(pelanggan, paket)

  // res.json(bayar)
  res.redirect(bayar.Data.Url)
})

export default router
