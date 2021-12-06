import nc from 'next-connect'
import crypto from 'crypto'

import session from '@/api/helpers/session'
import passportInspector from '@/api/helpers/passport_inspector'

const userSerializer = function (values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const authEmailInspectorLogin = async (req, res, next) => {
  passportInspector.authenticate('inspector-local', async (err, user, info) => {
    if (err) return res.status(500).end(err.toString())
    if (!user) return res.status(401).json(info)

    const token = crypto.randomBytes(64).toString('hex')
    await user.createAuthenticityToken({ token })

    req.session.set('token', token)
    await req.session.save()

    return res.status(200).json(userSerializer(user))
  })(req, res, next)
}

export default nc()
  .use(session)
  .use(passportInspector.initialize())
  .use(passportInspector.session())
  .use(authEmailInspectorLogin)
