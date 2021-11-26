import { Profile } from '@/db/models'

const getProfileByProfileId = async (req, res, next) => {
  const { query: { profileId } } = req
  console.log(profileId)
  if (profileId) {
    const oneProfile = await Profile.findOne({
      where: { id: profileId },
      include: Profile.User
    })

    if (oneProfile) {
      res.locals = {}
      res.locals.oneProfile = oneProfile
    }
  }

  if (res.locals.oneProfile === undefined) {
    res.locals.oneProfile = null
  }

  return next()
}

export default getProfileByProfileId
