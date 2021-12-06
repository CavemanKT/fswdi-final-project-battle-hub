import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'

import { User } from '@/db/models'

passport.use('inspector-local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  const user = await User.findOne({ where: { email, registrationType: 'email', type: 'inspector' } })

  if (!user) return done(null, false, { message: 'User Not Found' })
  if (!await bcrypt.compare(password, user.passwordHash)) return done(null, false, { message: 'Incorrect Password' })

  return done(null, user)
}))

export default passport
