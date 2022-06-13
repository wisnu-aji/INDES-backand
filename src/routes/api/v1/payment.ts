import { Router } from 'express'
import { XenditCallback } from 'indes-typings'
import { getBatasPembayaran } from '../../../lib/getBatasPembayaran'
import { Pelanggan } from '../../../models/Pelanggan'
import { authIpaymu, authXendit } from './middleware/auth'

const router = Router()

router.post('/notify', authIpaymu, async (req, res) => {
  console.log('/notify: ', req.body, req.headers)
  const body = req.body
  const [pelangganId, bulanPembayaran] = req.body.reference_id.split('-')
  const pelanggan = await Pelanggan.findById(pelangganId)
  if (!pelanggan) {
    res.status(404).json({ ok: false, message: 'pelanggan tidak ditemukan' })
    return
  }

  if (body.status === 'berhasil') {
    // add 1 month to batasPembayaran
    const batasPembayaran = new Date(pelanggan.batasPembayaran)
    const tanggalPemasangan = new Date(pelanggan.pemasangan)

    if (pelanggan.riwayatPembayaran.length + 1 === +bulanPembayaran) {
      const batasPembayaranBaru = getBatasPembayaran(
        batasPembayaran,
        tanggalPemasangan.getDate()
      )
      pelanggan.batasPembayaran = batasPembayaranBaru
      pelanggan.riwayatPembayaran = pelanggan.riwayatPembayaran.concat([
        {
          metodePembayaran: body.via,
          tanggalPembayaran: new Date(body.paid_at),
          jumlahPembayaran: +body.total,
        },
      ])

      const pelangganNew = await pelanggan.save()
      console.log('pelangganUpdate: ', pelangganNew)
    } else {
      res
        .status(500)
        .json({
          ok: false,
          message:
            'Bulan pembayaran ' +
            bulanPembayaran +
            ' tidak sesuai dengan bulan dalam riwayat ' +
            pelanggan.riwayatPembayaran.length,
        })
    }
  }

  res.json({ ok: true })
})
router.post('/cancel', async (req, res) => {
  console.log('/cancel: ', req.body)
  res.json({ ok: true })
})

router.post('/notify/xendit', authXendit, async (req, res) => {
  const body = req.body as XenditCallback
  const [, pelangganId, bulanPembayaran] = body.external_id.split('-')
  const pelanggan = await Pelanggan.findById(pelangganId)
  if (!pelanggan) {
    res.status(404).json({ ok: false, message: 'pelanggan tidak ditemukan' })
    return
  }

  if (body.status === 'PAID') {
    // add 1 month to batasPembayaran
    const batasPembayaran = new Date(pelanggan.batasPembayaran)
    const tanggalPemasangan = new Date(pelanggan.pemasangan)

    const batasPembayaranBaru = getBatasPembayaran(
      batasPembayaran,
      tanggalPemasangan.getDate()
    )
    pelanggan.batasPembayaran = batasPembayaranBaru
    pelanggan.riwayatPembayaran = pelanggan.riwayatPembayaran.concat([
      {
        metodePembayaran: body.payment_channel,
        tanggalPembayaran: new Date(body.paid_at),
        jumlahPembayaran: body.amount,
      },
    ])

    const pelangganNew = await pelanggan.save()
    console.log('pelangganUpdate: ', pelangganNew)
  }

  res.json({ ok: true })
})

export default router
