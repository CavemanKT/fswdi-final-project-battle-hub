import nc from 'next-connect'

import { Profile } from '@/db/models'

const getCandidateList = async (req, res) => {
  const { query: { gameTitle } } = req
  console.log('gameTitle',gameTitle);

  const candidateList = await Profile.findAll({
    where: { gameTitle: gameTitle}
  })

  console.log('candidateList',candidateList);

  res.status(200).json({ candidateList })
}

export default nc()
  .use(getCandidateList)
