import { Pelanggan } from '../models/Pelanggan'

function _generateId() {
  return Math.floor(Math.random() * 899999) + 100000
}

export const generateId = async (): Promise<string> => {
  let id = _generateId().toString()
  while (await Pelanggan.findById(id)) {
    id = _generateId().toString()
  }
  return id
}
