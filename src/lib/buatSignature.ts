import crypto from 'crypto'
import FormData from 'form-data'

import { PelangganType, PaketType } from 'indes-typings'
import { encrypt } from './cryptr'
export const buatSignature = (pelanggan: PelangganType, paket: PaketType) => {
  const isProduction = process.env.NODE_ENV === 'production'

  const httpmethod = 'POST'
  const vaNumber = process.env.IPAYMU_VA
  const apiKey = process.env.IPAYMU_API_KEY

  const bodyJSON = {
    product: [paket.kecepatan],
    qty: [1],
    price: [paket.harga],
    description: ['Pembayaran WiFi a/n ' + pelanggan.nama],
    returnUrl: process.env.URL + '/api/v1/payment/return',
    notifyUrl: process.env.URL + '/api/v1/payment/notify',
    cancelUrl: process.env.URL + '/api/v1/payment/cancel',
    buyerName: pelanggan.nama,
    buyerPhone: pelanggan.telepon,
    buyerEmail: pelanggan._id + '@' + process.env.MAIL || 'wisnuaji.my.id',
    // referenceId:
    //   pelanggan._id +
    //   '-' +
    //   (pelanggan.riwayatPembayaran.length + 1) +
    //   '-' +
    //   Date.now(),
  }
  console.log(bodyJSON)
  const bodyHash = crypto
    .createHash('SHA256')
    .update(JSON.stringify(bodyJSON))
    .digest('hex')
    .toLowerCase()
  const signature = crypto
    .createHmac('SHA256', apiKey as string)
    .update(`${httpmethod}:${vaNumber}:${bodyHash}:${apiKey}`)
    .digest('hex')
  return { signature, bodyJSON, vaNumber }
}
