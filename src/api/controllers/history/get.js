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

  // const amount1 = {}
  // const amount2 = {}
  // const amount3 = {}
  // const amount4 = {}

  // const handleTime1 = () => {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < historySeason1.length; i++) {
  //     if (historySeason1[i].result === 'won') {
  //       amount1.won = amount1.won ? amount1.won + 1 : 1
  //     }
  //     if (historySeason1[i].result === 'lost') {
  //       amount1.lost = amount1.lost ? amount1.lost + 1 : 1
  //     }
  //     if (historySeason1[i].result === 'draw') {
  //       amount1.draw = amount1.draw ? amount1.draw + 1 : 1
  //     }
  //   }
  //   if (!amount1.lost) {
  //     amount1.lost = 0
  //   }
  //   if (!amount1.draw) {
  //     amount1.draw = 0
  //   }
  //   if (amount1.won) {
  //     return amount1.won / (amount1.won + amount1.lost + amount1.draw)
  //   }
  //   return Number(0)
  // }
  // const handleTime2 = () => {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < historySeason2.length; i++) {
  //     if (historySeason2[i].result === 'won') {
  //       amount2.won = amount2.won ? amount2.won + 1 : 1
  //     }
  //     if (historySeason2[i].result === 'lost') {
  //       amount2.lost = amount2.lost ? amount2.lost + 1 : 1
  //     }
  //     if (historySeason2[i].result === 'draw') {
  //       amount2.draw = amount2.draw ? amount2.draw + 1 : 1
  //     }
  //   }
  //   if (!amount2.lost) {
  //     amount2.lost = 0
  //   }
  //   if (!amount2.draw) {
  //     amount2.draw = 0
  //   }
  //   if (amount2.won) {
  //     return amount2.won / (amount2.won + amount2.lost + amount2.draw)
  //   }
  //   return Number(0)
  // }
  // const handleTime3 = () => {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < historySeason3.length; i++) {
  //     if (historySeason3[i].result === 'won') {
  //       amount3.won = amount3.won ? amount3.won + 1 : 1
  //     }
  //     if (historySeason3[i].result === 'lost') {
  //       amount3.lost = amount3.lost ? amount3.lost + 1 : 1
  //     }
  //     if (historySeason3[i].result === 'draw') {
  //       amount3.draw = amount3.draw ? amount3.draw + 1 : 1
  //     }
  //   }
  //   if (!amount3.lost) {
  //     amount3.lost = 0
  //   }
  //   if (!amount3.draw) {
  //     amount3.draw = 0
  //   }
  //   if (amount3.won) {
  //     return amount3.won / (amount3.won + amount3.lost + amount3.draw)
  //   }
  //   return Number(0)
  // }
  // const handleTime4 = () => {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < historySeason4.length; i++) {
  //     if (historySeason4[i].result === 'won') {
  //       amount4.won = amount4.won ? amount4.won + 1 : 1
  //     }
  //     if (historySeason4[i].result === 'lost') {
  //       amount4.lost = amount4.lost ? amount4.lost + 1 : 1
  //     }
  //     if (historySeason4[i].result === 'draw') {
  //       amount4.draw = amount4.draw ? amount4.draw + 1 : 1
  //     }
  //   }
  //   if (!amount4.lost) {
  //     amount4.lost = 0
  //   }
  //   if (!amount4.draw) {
  //     amount4.draw = 0
  //   }
  //   if (amount4.won) {
  //     return amount4.won / (amount4.won + amount4.lost + amount4.draw)
  //   }
  //   return Number(0)
  // }

  // const win1 = handleTime1()
  // const win2 = handleTime2()
  // const win3 = handleTime3()
  // const win4 = handleTime4()
  // console.log('winningRate1: ', win1)
  // console.log('winningRate2: ', win2)
  // console.log('winningRate3: ', win3)
  // console.log('winningRate4: ', win4)

  res.status(200).json({ history, historySeason1, historySeason2, historySeason3, historySeason4 })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(historyGet)
