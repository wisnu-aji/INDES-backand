import { PelangganType } from 'indes-typings'
import { Pelanggan } from '../models/Pelanggan'

export const searchPelanggan = async (
  _id: number
): Promise<PelangganType | null> => {
  try {
    const pelanggan = await Pelanggan.findById(_id)
    if (!pelanggan) {
      return null
    }

    return pelanggan
  } catch (e) {
    return null
  }
}
