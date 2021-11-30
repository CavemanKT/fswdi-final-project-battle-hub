import nc from 'next-connect'

import rejectInvitation from '@/api/controllers/invitation/rejectInvitation'

export default nc()
  .delete(rejectInvitation)
