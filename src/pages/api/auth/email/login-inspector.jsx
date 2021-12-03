import nc from 'next-connect'

import authEmailInspectorLogin from '@/api/controllers/auth/email/login-inspector'

export default nc()
  .post(authEmailInspectorLogin)
