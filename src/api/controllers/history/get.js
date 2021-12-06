import nc from 'next-connect'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { History } from '@/db/models'

const historyGet = async (req, res) => {
  const { query: { profileId } } = req
  // const { currentProfile } = res

  const history = await History.findAll({
    where: {
      ProfileId: profileId
    }
  })

  console.log(history)

  res.status(200).json({ history })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(historyGet)
