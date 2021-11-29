import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Invitation } from '@/db/models'

const localNotificationGet = async (req, res) => {
  const { currentProfile } = res

  const invitation1 = await Invitation.findOne({
    where: {
      profile1: currentProfile.id
    }
  })

  const invitation2 = await Invitation.findOne({
    where: {
      profile2: currentProfile.id
    }
  })

  res.status(200).json({ invitation1, invitation2 })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(localNotificationGet)
