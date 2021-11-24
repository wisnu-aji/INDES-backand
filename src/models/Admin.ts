import { Schema, model } from 'mongoose'
import { AdminType } from 'indes-typings'

const AdminSchema = new Schema<AdminType>({
  _id: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
  },
  nama: {
    required: true,
    type: String,
  },
})

export const Admin = model('Admin', AdminSchema)
