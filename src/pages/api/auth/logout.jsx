import nc from 'next-connect'

import authLogout from '@/api/controllers/auth/logout'

export default nc()
  .delete(authLogout)
