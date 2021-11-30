import nc from 'next-connect'

import setInvitationResult from '@/api/controllers/invitation/setInvitationResult'

export default nc()
  .put(setInvitationResult)
