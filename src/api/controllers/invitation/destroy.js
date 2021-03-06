import nc from 'next-connect'
import { Op } from 'sequelize'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Invitation } from '@/db/models'

const invitationDestroy = async (req, res) => {
  const { query: { profileId } } = req
  const { currentProfile } = res

  const invitation = await Invitation.destroy({
    where: {
      [Op.or]: [
        {
          profile1: currentProfile.id,
          profile2: profileId,
          status: 'pending'
        },
        {
          profile1: profileId,
          profile2: currentProfile.id,
          status: 'pending'
        }
      ]
    }
  })

  res.status(200).json({ invitation })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(invitationDestroy)
