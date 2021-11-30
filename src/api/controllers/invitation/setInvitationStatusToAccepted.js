import nc from 'next-connect'
import { Invitation } from '@/db/models'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'

const { Op } = require('sequelize')

const setInvitationStatusToAccepted = async (req, res) => {
  const { query: { invitationId, profileId } } = req
  const { currentProfile } = res

  await Invitation.update({
    status: 'accepted'
  }, {
    where: {
      id: invitationId
    }
  })

  await Invitation.destroy({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {
              profile1: currentProfile.id
            },
            {
              profile2: currentProfile.id
            },
            {
              profile1: profileId
            },
            {
              profile2: profileId
            }
          ]
        },
        {
          status: 'pending'
        }
      ]
    }
  })
  res.status(200).json()
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(setInvitationStatusToAccepted)
