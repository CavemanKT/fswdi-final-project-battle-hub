import nc from 'next-connect'

import { Profile } from '@/db/models'

const getCandidateList = async (req, res) => {
  const { query: { gameTitle } } = req

  const candidateList = await Profile.findAll({
    where: {
      gameTitle
    },
    include: Profile.User
  })

  // console.log('candidateList',candidateList[0].User);

  res.status(200).json({ candidateList })
}

export default nc()
  .use(getCandidateList)
