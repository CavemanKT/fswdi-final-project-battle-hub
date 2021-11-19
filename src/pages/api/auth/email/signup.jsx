import nc from 'next-connect'

import authEmailSignup from '@/api/controllers/auth/email/signup'

export default nc()
  .post(authEmailSignup)
