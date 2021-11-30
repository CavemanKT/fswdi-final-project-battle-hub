import nc from 'next-connect'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

// import { body } from 'express-validator'
import { User } from '@/db/models'
import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'

// import { checkValidation } from '@/api/helpers/check-validation'

// const validation = [
//   body('email')
//     .notEmpty().withMessage('Email is Required')
//     .isEmail()
//     .withMessage('Email must be valid')
//     .custom(async (email) => {
//       if (email) {
//         const user = await User.findOne({ where: { email } })
//         if (user) return Promise.reject()
//       }
//     })
//     .withMessage('Email already in use'),
//   body('password')
//     .notEmpty().withMessage('Password is Required')
//     .isLength({ min: 6 })
//     .withMessage('Password must be longer or equal to 6 characters')
// ]

const userSerializer = function (values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const authEmailSignup = async (req, res) => {
  const user = await User.build({
    ...req.body, registrationType: 'email', type: 'candidate'
  }, {
    attributes: ['name', 'email', 'passwordHash', 'registrationType', 'type']
  })

  user.passwordHash = await bcrypt.hash(req.body.password, 10)
  await user.save()

  const token = crypto.randomBytes(64).toString('hex')
  await user.createAuthenticityToken({ token })

  req.session.set('token', token)
  await req.session.save()

  res.status(200).json(userSerializer(user))
}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  // .use(checkValidation)
  // .use(validation)
  .use(authEmailSignup)
