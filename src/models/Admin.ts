import { Schema, model } from 'mongoose'
import { AdminType } from 'indes-typings'

const AdminSchema = new Schema<AdminType>({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  nama: {
    required: true,
    type: String,
  },
})

export const Admin = model('Admin', AdminSchema, 'Admin')
