import { google } from 'googleapis'

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const URL = process.env.URL

if (!URL || !CLIENT_ID || !CLIENT_SECRET)
  throw new Error(
    `${
      !URL ? 'URL' : CLIENT_ID ? 'CLIENT_SECRET' : 'CLIENT_ID'
    } is required in envoirment`
  )

export const oauth2Client = () =>
  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, URL + '/callbacks')
export const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

export const generateURL = () =>
  oauth2Client().generateAuthUrl({
    scope: scopes,
  })
