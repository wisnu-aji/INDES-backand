declare module 'indes-typings' {
  export interface AdminType {
    _id: number
    email: string
    nama: string
  }

  export interface PaketType {
    _id: number
    kecepatan: string
    harga: number
  }

  export interface PelangganType {
    _id: number
    nama: string
    alamat: string
    telepon: number
    paket: number
    pemasangan: Date
    batasPembayaran: Date
  }

  export type User = Omit<PelangganType, "_id">
}