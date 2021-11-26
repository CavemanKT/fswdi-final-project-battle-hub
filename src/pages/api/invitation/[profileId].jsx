import nc from 'next-connect'

import invitationGet from '@/api/controllers/invitation/get'
import invitationCreate from '@/api/controllers/invitation/create'
import invitationDestroy from '@/api/controllers/invitation/destroy'

export default nc()
  .get(invitationGet)
  .post(invitationCreate)
  .delete(invitationDestroy)
