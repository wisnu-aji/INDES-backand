import cors from 'cors'
import isUrl from 'is-url'

// let url = process.env.url

// if (!url) throw new Error('URL is required in envoirment')
// const isUrlValid = url.split(',').every(isUrl)
// if (!isUrlValid)
//   throw new Error(
//     'URL envoirment has wrong format' +
//       `Please use \n "https://example1.com,https://example2.com"`
//   )

export const corsOption = cors()
