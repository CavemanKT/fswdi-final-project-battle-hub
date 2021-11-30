import nc from 'next-connect'
import { Op } from 'sequelize'
import { Invitation, History } from '@/db/models'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'

const setInvitationResult = async (req, res) => {
  const { query: { invitationId, profileId } } = req
  const { currentProfile } = res

  const result = Object.keys(req.body)[0]
  // console.log(invitationId, currentProfile.id, profileId, Object.keys(req.body))

  await Invitation.update({
    result1: result
  }, {
    where: {
      id: invitationId,
      profile1: currentProfile.id,
      profile2: profileId,
      status: 'accepted'
    }
  })

  await Invitation.update({
    result2: result
  }, {
    where: {
      id: invitationId,
      profile1: profileId,
      profile2: currentProfile.id,
      status: 'accepted'
    }
  })

  const invitation1 = await Invitation.destroy({
    where: {
      id: invitationId,
      profile1: currentProfile.id,
      profile2: profileId,
      status: 'accepted',
      [Op.and]: [
        {
          [Op.or]: [
            {
              result1: 'won'
            },
            {
              result1: 'lost'
            },
            {
              result1: 'draw'
            }
          ]
        }, {
          [Op.or]: [
            {
              result2: 'won'
            },
            {
              result2: 'lost'
            },
            {
              result2: 'draw'
            }
          ]
        }
      ]
    }
  })

  const invitation2 = await Invitation.destroy({
    where: {
      id: invitationId,
      profile1: profileId,
      profile2: currentProfile.id,
      status: 'accepted',
      [Op.and]: [
        {
          [Op.or]: [
            {
              result1: 'won'
            },
            {
              result1: 'lost'
            },
            {
              result1: 'draw'
            }
          ]
        }, {
          [Op.or]: [
            {
              result2: 'won'
            },
            {
              result2: 'lost'
            },
            {
              result2: 'draw'
            }
          ]
        }
      ]
    }
  })

  const history = await History.create({
    ProfileId: currentProfile.id, result
  })

  console.log(invitation1, invitation2, history)

  res.status(200).json({ history })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(setInvitationResult)
