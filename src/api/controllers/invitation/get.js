import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Invitation } from '@/db/models'

const invitationGet = async (req, res) => {
  const { query: { profileId } } = req
  const { currentProfile } = res
  // console.log('profileId', profileId)
  // console.log('currentProfileId', currentProfile.id)

  // let profileId = Number(currentProfile.id)
  const invitation1 = await Invitation.findOne({
    where: {
      profile1: currentProfile.id,
      profile2: profileId
    }
  })

  const invitation2 = await Invitation.findOne({
    where: {
      profile1: profileId,
      profile2: currentProfile.id
    }
  })

  const obj = { invitation1, invitation2 }
  console.log(invitation1, invitation2)
  res.status(200).json({ invitation1, invitation2 })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(invitationGet)
