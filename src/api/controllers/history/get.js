/* eslint-disable no-param-reassign */
import nc from 'next-connect'
import { Op } from 'sequelize'
import authenticateUser from '@/api/helpers/authenticateUser'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import session from '@/api/helpers/session'
import { History } from '@/db/models'

const historyGet = async (req, res) => {
  const { query: { profileId } } = req

  const history = await History.findAll({
    where: {
      ProfileId: profileId
    },
    include: History.Profile
  })

  const historySeason1 = await History.findAll({
    where: {
      ProfileId: profileId,
      createdAt: {
        [Op.gt]: new Date('2010-01-01 00:29:29.516+08'),
        [Op.lt]: new Date('2010-03-30 13:29:29.516+08')
      }
    },
    include: History.Profile
  })

  const historySeason2 = await History.findAll({
    where: {
      ProfileId: profileId,
      createdAt: {
        [Op.gt]: new Date('2010-03-30 13:29:29.516+08'),
        [Op.lt]: new Date('2010-06-30 13:29:29.516+08')
      }
    },
    include: History.Profile
  })

  const historySeason3 = await History.findAll({
    where: {
      ProfileId: profileId,
      createdAt: {
        [Op.gt]: new Date('2010-06-30 13:29:29.516+08'),
        [Op.lt]: new Date('2010-09-30 13:29:29.516+08')
      }
    },
    include: History.Profile
  })

  const historySeason4 = await History.findAll({
    where: {
      ProfileId: profileId,
      createdAt: {
        [Op.gt]: new Date('2010-09-30 13:29:29.516+08'),
        [Op.lt]: new Date('2010-12-30 13:29:29.516+08')
      }
    },
    include: History.Profile
  })

  console.log('historySeason1', historySeason1, historySeason2, historySeason3, historySeason4)

  res.status(200).json({ history, historySeason1, historySeason2, historySeason3, historySeason4 })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(historyGet)
