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
  telepon: {
    required: true,
    type: Number,
    unique: true,
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
  riwayatPembayaran: {
    required: false,
    type: [],
    default: [],
  },
})

export const Pelanggan = model('Pelanggan', PelangganSchema, 'pelanggan')
