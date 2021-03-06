import nc from 'next-connect'
import { Op } from 'sequelize'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Invitation } from '@/db/models'

const localNotificationGet = async (req, res) => {
  const { currentProfile } = res

  const invitation1 = await Invitation.findAll({
    where:
        {
          profile2: currentProfile.id
        },
    include: [
      {
        association: Invitation.OwnerProfile
      }, {
        association: Invitation.ReceiverProfile
      }
    ]
  })

  const invitation2 = await Invitation.findAll({
    where: {
      profile1: currentProfile.id
    },
    include: [
      {
        association: Invitation.OwnerProfile
      }, {
        association: Invitation.ReceiverProfile
      }
    ]
  })

  res.status(200).json({ invitation1, invitation2 })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(localNotificationGet)
