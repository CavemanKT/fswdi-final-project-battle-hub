import nc from 'next-connect'
import crypto from 'crypto'

import session from '@/api/helpers/session'
import passport from '@/api/helpers/passport'

const authEmailLogin = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return res.status(500).end(err.toString())
    if (!user) return res.status(401).json(info)

    const token = crypto.randomBytes(64).toString('hex')
    await user.createAuthenticityToken({ token })

    req.session.set('token', token)
    await req.session.save()

    return res.status(200).json({ user })
  })(req, res, next)
}

export default nc()
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(authEmailLogin)
