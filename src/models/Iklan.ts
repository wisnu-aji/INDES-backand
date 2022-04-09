import { Schema, model } from 'mongoose'
import { IklanType } from 'indes-typings'

const IklanSchema = new Schema<IklanType>({
  _id: {
    required: true,
    type: Number,
  },
  nama_iklan: {
    required: true,
    type: String,
  },
  expired: {
    required: true,
    type: Date,
  },
  gambar: {
    required: true,
    type: String,
  },
})

export const Iklan = model('Iklan', IklanSchema, 'iklan')
