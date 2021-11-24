import { Schema, model } from 'mongoose'
import { PelangganType } from 'indes-typings'

const PelangganSchema = new Schema<PelangganType>({
  _id: {
    required: true,
    type: Number,
  },
  nama: {
    required: true,
    type: String,
  },
  alamat: {
    required: true,
    type: String,
  },
  telpon: {
    required: true,
    type: Number,
  },
  paket: {
    required: true,
    type: Number,
  },

  pemasangan: {
    required: true,
    type: Date,
  },
  batasPembayaran: {
    required: true,
    type: Date,
  },
})

export const Pelanggan = model('Pelanggan', PelangganSchema)
