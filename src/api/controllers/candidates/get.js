import nc from 'next-connect'

import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'

import { Profile } from '@/db/models/profile'

const getCandidateList = async (req, res) => {
  const { params } = req
  console.log('gameTitle', req);
  const candidateList = await Profile.findAll({
    where: { gameTitle: gameTitle}
  })
  // console.log(candidateList);

  res.status(200).json({ candidateList })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(getCandidateList)
