const { validationResult } = require('express-validator')

const checkValidation = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(406).json(errors)

  return next()
}

export default checkValidation
