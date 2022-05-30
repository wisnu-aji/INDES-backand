import Cryptr from 'cryptr'

const cryptr = new Cryptr(process.env.SECRET!)

export const { encrypt, decrypt } = cryptr