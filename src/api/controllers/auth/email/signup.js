import nc from 'next-connect'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { User } from '@/db/models'
import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'

const authEmailSignup = async (req, res) => {
  console.log('signup')
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

  res.status(200).json({ user })
}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(authEmailSignup)
