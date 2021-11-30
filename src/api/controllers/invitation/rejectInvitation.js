import nc from 'next-connect'
import { Op } from 'sequelize'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Invitation } from '@/db/models'

const invitationDestroy = async (req, res) => {
  const { query: { invitationId } } = req

  const invitation = await Invitation.destroy({
    where: {
      id: invitationId
    }
  })

  res.status(200).json({ invitation })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(invitationDestroy)
