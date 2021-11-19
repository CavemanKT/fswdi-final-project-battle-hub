import nc from 'next-connect'

import session from '@/api/helpers/session'

const authLogout = async (req, res) => {
  req.session.destroy()
  res.status(204).json()
}

export default nc()
  .use(session)
  .use(authLogout)
