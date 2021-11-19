import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'

const myProfileShow = (req, res) => {
  res.status(200).json({ user: res.currentUser })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(myProfileShow)
