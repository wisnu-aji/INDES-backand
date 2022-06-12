import { Router } from 'express'
import { linkBayar } from '../../../lib/linkBayar'
import { getXenditInvoice } from '../../../lib/xenditInvoice'
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

  const bayarFromIPaymu = await linkBayar(pelanggan, paket)
  const bayarFromXendit = await getXenditInvoice(pelanggan, paket)

  if (process.env.NODE_ENV === 'development') {
    const ipaymu = bayarFromIPaymu.Data.Url
    const xendit = bayarFromXendit.invoice_url

    res.send(
      `<html><body>Dengan ipaymu: <a href="${ipaymu}">klik di sini</a><br />Dengan xendit: <a href="${xendit}">klik di sini</a></body></html>`
    )
  } else {
    res.redirect(bayarFromXendit.invoice_url)
  }
})

export default router
