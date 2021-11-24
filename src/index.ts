import express from 'express'
import Mongoose from 'mongoose'
const app = express()

app.listen(process.env.PORT || 3000)
const mongodb = process.env.MONGODB

if (!mongodb) throw new Error('MONGODB required in envoirment')
Mongoose.connect(mongodb).then(() => console.log('Connected to MONGODB'))
