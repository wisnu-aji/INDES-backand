import axios from 'axios'
import { PaketType, PelangganType } from 'indes-typings'
import { buatSignature } from './buatSignature'

export const linkBayar = async (pelanggan: PelangganType, paket: PaketType) => {
  const { signature, bodyJSON, requestBody, vaNumber } = buatSignature(
    pelanggan,
    paket
  )

  const response = await axios.post(
   process.env.IPAYMU_URL! + '/api/v2/payment',
    bodyJSON,
    {
      headers: {
        'Content-Type': 'application/json',
        signature,
        va: vaNumber!.toString(),
        timestamp: Date.now().toString(),
      },
    }
  )

  return response.data
}
