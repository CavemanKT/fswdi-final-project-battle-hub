import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Invitation } from '@/db/models'

const invitationDestroy = async (req, res) => {
  const { query: { profileId } } = req
  const { currentProfile } = res

  const invitation1 = await Invitation.destroy({
    where: {
      profile1: currentProfile.id,
      profile2: profileId,
      status: 'pending'
    }
  })

  const invitation2 = await Invitation.destroy({
    where: {
      profile1: profileId,
      profile2: currentProfile.id,
      status: 'pending'
    }
  })

  console.log(invitation1, invitation2)
  res.status(200).json({ invitation1, invitation2 })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(invitationDestroy)
