import nc from 'next-connect'

import { Profile } from '@/db/models'

const getCandidateList = async (req, res) => {
  const { query: { gameTitle } } = req

  const candidateList = await Profile.findAll({
    where: {
      gameTitle
    },
    include: [
      {
        association: Profile.User
      },
      {
        association: Profile.Histories
      }
    ],
    order: [['createdAt', 'DESC']]

  })

  console.log(candidateList)

  res.status(200).json({ candidateList })
}

export default nc()
  .use(getCandidateList)
