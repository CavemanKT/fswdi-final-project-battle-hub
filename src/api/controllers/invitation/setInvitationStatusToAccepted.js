import nc from 'next-connect'
import { Invitation } from '@/db/models'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'

const setInvitationStatusToAccepted = async (req, res) => {
  const { query: { invitationId, profileId } } = req
  console.log(req.query)

  const updateStatus = await Invitation.update({
    status: 'accepted'
  }, {
    where: {
      id: invitationId
    }
  })

  const destroyOtherPendingStatus = await Invitation.destroy({
    where: {
      profile1:
    }
  })
  console.log(updateStatus)

  const
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(setInvitationStatusToAccepted)
