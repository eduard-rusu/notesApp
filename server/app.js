const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = config.MONGODB_URI
mongoose.connect(uri)
  .then(() => logger.info('Connected to db'))
  .catch(() => logger.error('Failed to connect to db'))


app.use(cors())
app.use(express.json())
app.use(middleware.morgan)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app