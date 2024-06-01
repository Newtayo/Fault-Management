const CustomErrors = require('../errors/customError')
//handles customer erros
const errorMiddlewares = (err, req, res, next) => {
  if (err instanceof CustomErrors) {
    res.status(err.statusCode).json({msg: err.message})
  }
  res.status(500).json({ msg: err.message })
}

module.exports = errorMiddlewares;