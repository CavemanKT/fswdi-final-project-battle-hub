import nc from 'next-connect'

import invitationCreate from '@/api/controllers/invitation/create'
// import invitationGet from '@/api/controllers/invitation/get'

export default nc()
  .post(invitationCreate)
  // .get(invitationGet)
