declare module 'indes-typings' {
  export interface AdminType {
    _id: number
    email: string
    name: string
  }

  export interface PaketType {
    _id: number
    kecepatan: string
    harga: number
  }
  export interface RiwayatPembayaran {
    tanggalPembayaran: Date
    jumlahPembayaran: number
    metodePembayaran: string
  }

  export interface PelangganType {
    _id: string
    nama: string
    password: string
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

  export interface AvailableBank {
    bank_code: string
    collection_type: string
    transfer_amount: number
    bank_branch: string
    account_holder_name: string
    identity_amount: number
  }

  export interface AvailableRetailOutlet {
    retail_outlet_name: string
  }

  export interface AvailableEwallet {
    ewallet_type: string
  }

  export interface AvailableDirectDebit {
    direct_debit_type: string
  }

  export interface XenditInvoice {
    id: string
    external_id: string
    user_id: string
    status: string
    merchant_name: string
    merchant_profile_picture_url: string
    amount: number
    payer_email: string
    description: string
    expiry_date: Date
    invoice_url: string
    available_banks: AvailableBank[]
    available_retail_outlets: AvailableRetailOutlet[]
    available_ewallets: AvailableEwallet[]
    available_direct_debits: AvailableDirectDebit[]
    available_paylaters: any[]
    should_exclude_credit_card: boolean
    should_send_email: boolean
    created: Date
    updated: Date
    currency: string
  }

  export interface XenditCallback {
    id: string;
    external_id: string;
    user_id: string;
    is_high: boolean;
    payment_method: string;
    status: string;
    merchant_name: string;
    amount: number;
    paid_amount: number;
    bank_code: string;
    paid_at: Date;
    payer_email: string;
    description: string;
    created: Date;
    updated: Date;
    currency: string;
    payment_channel: string;
    payment_destination: string;
}

}
