import nc from 'next-connect'
import { Op } from 'sequelize'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { Profile, History } from '@/db/models'

const profileDestroy = async (req, res) => {
  const { query: { profileId } } = req

  await Profile.destroy({
    where: {
      id: profileId
    }
  })

  const q = req.query.q || ''
  const page = Number(req.query.page) || 1
  const limit = 6
  const offset = (page - 1) * limit
  const candidateList = await Profile.findAndCountAll({
    where: {
      gameTitle: 'Path of Exile',
      characterName: {
        [Op.iLike]: `%${q}%`
      }
    },
    include: [
      {
        association: Profile.User
      },
      {
        association: Profile.Histories
      }
    ],
    order: [['createdAt', 'DESC']],
    limit,
    offset
  })

  await History.destroy({
    where: {
      ProfileId: profileId
    }
  })

  console.log(candidateList)

  res.status(200).json({ candidateList: candidateList.rows,
    filters: { q, page, limit, offset, totalPages: Math.ceil(candidateList.count / limit / 10 + 1) }
  })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(profileDestroy)
