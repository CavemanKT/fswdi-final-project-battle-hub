import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Invitation, Profile, InvitationProfile } from '@/db/models'

const { Op } = require('sequelize')

const invitationCreate = async (req, res) => {
  const { query: { profileId } } = req
  const { currentProfile } = res

  const invitationExisted = await Invitation.findOne({
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
          status: 'accepted'
        }
      ]

    }
  })

  if (invitationExisted) {
    res.status(200).json({ opponentIsBusy: true })
  }
  if (!invitationExisted) {
    const invitation = await Invitation.create({
      profile1: currentProfile.id,
      profile2: profileId,
      status: 'pending'
    })
    res.status(200).json({ invitation })
  }
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(invitationCreate)
