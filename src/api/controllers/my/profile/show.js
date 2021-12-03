import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'

const myProfileShow = (req, res) => {
  const userSerializer = function (values) {
    const { ...user } = values.dataValues
    delete user.passwordHash
    return user
  }

  res.status(200).json({ user: userSerializer(res.currentUser) })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myProfileShow)
