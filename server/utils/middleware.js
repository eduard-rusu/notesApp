const logger = require('./logger')
const morgan = require('morgan')('tiny')


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'UnknownEndpoint' })
}


const errorHandler = (err, req, res, next) => {
  logger.info(err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(err)
}

module.exports = {
  morgan, unknownEndpoint, errorHandler
}