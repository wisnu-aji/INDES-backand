import { Schema, model } from 'mongoose'
import { PaketType } from 'indes-typings'

const PaketSchema = new Schema<PaketType>({
  _id: {
    required: true,
    type: Number,
  },
  kecepatan: {
    required: true,
    type: String,
  },
  harga: {
    required: true,
    type: Number,
  },
})

export const Paket = model('Paket', PaketSchema)
