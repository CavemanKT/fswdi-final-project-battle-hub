import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'

// , 'Images.*.img1', 'Images.*.img2'
const permittedFields = ['characterName', 'gameTitle', 'weapon', 'amulet', 'armour', 'boots']

const profileCreate = async (req, res) => {
  const { currentUser } = res
  const profile = await currentUser.createProfile(req.body, {
    fields: permittedFields
  })

  res.status(200).json({ profile })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(profileCreate)
