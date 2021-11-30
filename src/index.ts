import express from 'express'
import Mongoose from 'mongoose'
import { oauth2Client } from './lib/google/oauth'
import api from './routes/api/v1'
import axios from 'axios'
import { Admin } from './models/Admin'
import { corsOption } from './lib/cors'

const url = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='
export interface UserProfile {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

const app = express()
app.use(corsOption)
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/v1', api)
app.get('/callbacks', async (req, res) => {
  const oauth = oauth2Client()
  const code = req.query.code as string
  const { tokens } = await oauth.getToken(code)
  const access_token = tokens.access_token
  const { data } = await axios.get<UserProfile>(url + access_token)
  const email = data.email
  const isAdmin = await Admin.findOne({ email })
  res.json({ admin: !!isAdmin, data: isAdmin || null })
})
const mongodb = process.env.MONGODB

if (!mongodb) throw new Error('MONGODB required in envoirment')
Mongoose.connect(mongodb).then(() => {
  console.log('Connected to MONGODB')
  app.listen(process.env.PORT || 3000)
})
