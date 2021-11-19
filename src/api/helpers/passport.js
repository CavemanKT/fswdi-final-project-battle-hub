import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'

import { User } from '@/db/models'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  const user = await User.findOne({ where: { email, registrationType: 'email' } })

  if (!user) return done(null, false, { message: 'User Not Found' })
  if (!await bcrypt.compare(password, user.passwordHash)) return done(null, false, { message: 'Incorrect Password' })

  return done(null, user)
}))

export default passport
