import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Invitation } from '@/db/models'

const invitationCreate = async (req, res) => {
  const { query: { profileId } } = req
  const { currentProfile } = res

  const invitation = await Invitation.create({
    profile1: currentProfile.id, profile2: profileId, status: 'pending'
  })

  res.status(200).json({ invitation })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(invitationCreate)
