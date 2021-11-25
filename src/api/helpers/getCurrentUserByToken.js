import { AuthenticityToken, User } from '@/db/models'

const getCurrentUserByToken = async (req, res, next) => {
  const token = req.session.get('token')

  if (token) {
    const authToken = await AuthenticityToken.findOne({
      where: { token },
      include: {
        association: AuthenticityToken.User,
        include: {
          association: User.Profile
        }
      }
    })

    if (authToken) {
      res.currentUser = authToken.User
    }
  }

  if (res.currentUser === undefined) {
    res.currentUser = null
  }

  return next()
}

export default getCurrentUserByToken
