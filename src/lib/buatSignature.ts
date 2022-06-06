import crypto from 'crypto'
import FormData from 'form-data'

import { PelangganType, PaketType } from 'indes-typings'
export const buatSignature = (pelanggan: PelangganType, paket: PaketType) => {
  const isProduction = process.env.NODE_ENV === 'production'

  const httpmethod = 'POST'
  const vaNumber = process.env.IPAYMU_VA
  const apiKey = process.env.IPAYMU_API_KEY

  const requestBody = new FormData()

  requestBody.append('product[]', `${paket.kecepatan} a/n ${pelanggan.nama}`)
  requestBody.append('qty[]', '1')
  requestBody.append('price[]', paket.harga)
  // requestBody.append('description', 'Pembayaran WiFi')
  requestBody.append('returnUrl', process.env.URL + '/api/v1/payment/return')
  requestBody.append('notifyUrl', process.env.URL + '/api/v1/payment/notify')
  requestBody.append('cancelUrl', process.env.URL + '/api/v1/payment/cancel')

  requestBody.append(
    'referenceId',
    pelanggan._id + '-' + (pelanggan.riwayatPembayaran.length + 1)
  )

  const bodyJSON = {
    product: [paket.kecepatan],
    qty: [1],
    price: [paket.harga],
    description: ['Pembayaran WiFi'],
    returnUrl: process.env.URL + '/api/payment/return',
    notifyUrl: process.env.URL + '/api/payment/notify',
    cancelUrl: process.env.URL + '/api/payment/cancel',
    buyerName: pelanggan.nama,
    buyerPhone: pelanggan.telepon,
    buyerEmail: pelanggan._id + '@' + process.env.MAIL || 'wisnuaji.my.id',
    referenceId: pelanggan._id + '-' + (pelanggan.riwayatPembayaran.length + 1),
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
  return { signature, bodyJSON, requestBody, vaNumber }
}
