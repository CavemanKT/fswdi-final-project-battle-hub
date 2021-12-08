import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import MulterParser from '@/_services/MulterParser'

// , 'Images.*.img1', 'Images.*.img2'
const permittedFields = ['characterName', 'gameTitle', 'weapon', 'amulet', 'armour', 'boots', 'thumbnail', 'img1', 'img2', 'img3', 'video']

const profileCreate = async (req, res) => {
  const { currentUser } = res

  const newInfo = { ...req.body.profile }

  if (req.files && req.files.length > 0) {
    newInfo.thumbnail = req.files?.[0]?.location || null
    newInfo.img1 = req.files?.[1]?.location || null
    newInfo.img2 = req.files?.[2]?.location || null
    newInfo.img3 = req.files?.[3]?.location || null
    newInfo.video = req.files?.[4]?.location || null
  }

  const profile = await currentUser.createProfile(newInfo, {
    fields: permittedFields
  })

  console.log(profile)
  res.status(200).json({ profile })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(MulterParser.any())
  .use(profileCreate)
