import nc from 'next-connect'
import { Profile } from '@/db/models'
import authenticateUser from '@/api/helpers/authenticateUser'

// , 'Images.*.img1', 'Images.*.img2'
const permittedFields = ['characterName', 'weapon', 'amulet', 'armour', 'boots']

const profileCreate = async (req, res) => {
  const { params: { gameTitle }} = req
  const profile = await Profile.create(req.body, {
    fields: permittedFields,
    // include: Profile.Images
  })

  res.status(200).json({ profile })
}

export default nc()
  .use(authenticateUser)
  .use(profileCreate)
