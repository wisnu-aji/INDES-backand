import express from 'express'
import Mongoose from 'mongoose'
import api from './routes/api/v1'

const app = express()
app.use(express.json())
app.use('/api/v1', api)

const mongodb = process.env.MONGODB

if (!mongodb) throw new Error('MONGODB required in envoirment')
Mongoose.connect(mongodb).then(() => {
  console.log('Connected to MONGODB')
  app.listen(process.env.PORT || 3000)
})
