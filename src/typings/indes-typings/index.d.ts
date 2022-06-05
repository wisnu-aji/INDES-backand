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
  export interface RiwayatPembayaran {
    tanggal: Date
    jumlahPembayaran: number
  }

  export interface PelangganType {
    _id: string
    nama: string
    alamat: string
    telepon: string
    paket: number
    pemasangan: Date
    batasPembayaran: Date
    riwayatPembayaran: RiwayatPembayaran[]
  }

  export type User = Omit<PelangganType, '_id'>
  export interface IklanType {
    _id: number
    nama_iklan: string
    expired: Date
    gambar: string
  }
}
