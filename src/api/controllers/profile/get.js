import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import getProfileByProfileId from '@/api/helpers/getProfileByProfileId'

import { Profile } from '@/db/models'


// , 'Images.*.img1', 'Images.*.img2'

const profileGet = async (req, res) => {
  const { locals: { oneProfile } } =res

  console.log(oneProfile);

  res.status(200).json({ oneProfile })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(getProfileByProfileId)
  .use(profileGet)
