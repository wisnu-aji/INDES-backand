import axios from 'axios'
import { PaketType, PelangganType, XenditInvoice } from 'indes-typings'
import { Paket } from '../models/Paket'
import { Pelanggan } from '../models/Pelanggan'

const xendit = axios.create({ baseURL: process.env.XENDIT_API_URL! })

export const getXenditInvoice = async (
  pelanggan: PelangganType,
  paket: PaketType
) => {
  const payload = {
    external_id: `invoice-${pelanggan._id}-${
      pelanggan.riwayatPembayaran.length + 1
    }`,
    amount: paket.harga,
    payer_email: pelanggan._id + '@' + process.env.MAIL || 'wisnuaji.my.id',
    description: `Pembayaran WiFi a/n ${pelanggan.nama} dengan paket ${paket.kecepatan}`,
  }

  const headers = {
    Authorization: `Basic ${process.env.XENDIT_API_KEY} `,
  }
  console.log(headers, payload)
  const response = await xendit.post<XenditInvoice>('/v2/invoices', payload, {
    headers,
  })

  return response.data
}
