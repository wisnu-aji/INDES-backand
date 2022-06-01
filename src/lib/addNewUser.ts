import { Pelanggan } from '../models/Pelanggan'
import { PelangganType, User } from 'indes-typings'
import { generateId } from './generateId'
export const addNewUser = async (
  props: User
): Promise<PelangganType | string> => {
  try {
    const isPhoneExist = await Pelanggan.findOne({telepon: props.telepon})
    if(isPhoneExist) return 'nomor telepon sudah terdaftar'
    const _id = await generateId()
    const data = { _id, ...props }
    const user = new Pelanggan(data)
    
    return await user.save()
  } catch (e: any) {
    return e.message as string
  }
}
