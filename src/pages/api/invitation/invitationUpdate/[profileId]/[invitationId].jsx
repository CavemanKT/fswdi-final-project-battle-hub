import nc from 'next-connect'

import setInvitationStatusToAccepted from '@/api/controllers/invitation/setInvitationStatusToAccepted'

export default nc()
  .put(setInvitationStatusToAccepted)
