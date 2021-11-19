import nc from 'next-connect'

import authEmailLogin from '@/api/controllers/auth/email/login'

export default nc()
  .post(authEmailLogin)
