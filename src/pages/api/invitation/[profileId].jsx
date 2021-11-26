import nc from 'next-connect'

import invitationGet from '@/api/controllers/invitation/get'
import invitationCreate from '@/api/controllers/invitation/create'

export default nc()
  .get(invitationGet)
  .post(invitationCreate)
