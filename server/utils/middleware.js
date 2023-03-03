const logger = require('./logger')
const morgan = require('morgan')('tiny')


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'UnknownEndpoint' })
}


const errorHandler = (err, req, res, next) => {
  logger.info(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Invalid id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  next(err)
}

module.exports = {
  morgan, unknownEndpoint, errorHandler
}