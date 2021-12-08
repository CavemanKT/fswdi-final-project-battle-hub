import nc from 'next-connect'

import { Op } from 'sequelize'
import { Profile } from '@/db/models'

const getCandidateList = async (req, res) => {
  const { query: { gameTitle } } = req

  const q = req.query.q || ''
  const page = Number(req.query.page) || 1
  const limit = 6
  const offset = (page - 1) * limit
  const candidateList = await Profile.findAndCountAll({
    where: {
      gameTitle,
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

  res.status(200).json({ candidateList: candidateList.rows,
    filters: { q, page, limit, offset, totalPages: Math.ceil(candidateList.count / limit / 10 + 1) }
  })
}

export default nc()
  .use(getCandidateList)
