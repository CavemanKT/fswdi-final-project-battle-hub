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
    },
    include: History.Profile
  })

  console.log(history)

  const amount1 = {}
  const amount2 = {}
  const amount3 = {}
  const amount4 = {}

  const win1 = {}
  const win2 = {}
  const win3 = {}
  const win4 = {}

  const handleTime1 = (date1, date2, date3) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < history?.length; i++) {
      if (history[i]?.result === 'won' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount1.won = amount1.won ? amount1.won + 1 : 1
      } else {
        amount1.won = 0
      }
      if (history[i]?.result === 'lost' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount1.lost = amount1.lost ? amount1.lost + 1 : 1
      } else {
        amount1.lost = 0
      }
      if (history[i]?.result === 'draw' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount1.draw = amount1.draw ? amount1.draw + 1 : 1
      } else {
        amount1.draw = 0
      }
    }

    if (amount1.won) {
      return amount1.won / (amount1.won + amount1.lost + amount1.draw)
    }
    return Number(0)
  }

  const handleTime2 = (date1, date2, date3) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < history?.length; i++) {
      if (history[i]?.result === 'won' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount2.won = amount2.won ? amount2.won + 1 : 1
      } else {
        amount2.won = 0
      }
      if (history[i]?.result === 'lost' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount2.lost = amount2.lost ? amount2.lost + 1 : 1
      } else {
        amount2.lost = 0
      }
      if (history[i]?.result === 'draw' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount2.draw = amount2.draw ? amount2.draw + 1 : 1
      } else {
        amount2.draw = 0
      }
    }

    if (amount2.won) {
      return amount2.won / (amount2.won + amount2.lost + amount2.draw)
    }
    return Number(0)
  }

  const handleTime3 = (date1, date2, date3) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < history?.length; i++) {
      if (history[i]?.result === 'won' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount3.won = amount3.won ? amount3.won + 1 : 1
      } else {
        amount3.won = 0
      }
      if (history[i]?.result === 'lost' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount3.lost = amount3.lost ? amount3.lost + 1 : 1
      } else {
        amount3.lost = 0
      }
      if (history[i]?.result === 'draw' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount3.draw = amount3.draw ? amount3.draw + 1 : 1
      } else {
        amount3.draw = 0
      }
    }
    console.log(amount3.lost)
    if (amount3.won) {
      return amount3.won / (amount3.won + amount3.lost + amount3.draw)
    }
    return Number(0)
  }

  const handleTime4 = (date1, date2, date3) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < history?.length; i++) {
      if (history[i]?.result === 'won' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount4.won = amount4.won ? amount4.won + 1 : 1
      } else {
        amount4.won = 0
      }
      if (history[i]?.result === 'lost' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount4.lost = amount4.lost ? amount4.lost + 1 : 1
      } else {
        amount4.won = 0
      }
      if (history[i]?.result === 'draw' && ((`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date1 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date2 || (`${history[i]?.createdAt.split('-')[0]}-${history[i]?.createdAt.split('-')[1]}`) === date3)) {
        amount4.draw = amount4.draw ? amount4.draw + 1 : 1
      } else {
        amount4.won = 0
      }
    }

    if (amount4.won) {
      return amount4.won / (amount4.won + amount4.lost + amount4.draw)
    }
    return Number(0)
  }

  win1.a = handleTime1('2010-01', '2010-02', '2010-03')
  win2.a = handleTime2('2010-04', '2010-05', '2010-06')
  win3.a = handleTime3('2010-07', '2010-08', '2010-09')
  win4.a = handleTime4('2010-10', '2010-11', '2010-12')
  console.log(win1.a, win2.a, win3.a, win4.a)
  res.status(200).json({ history, win1: win1.a, win2: win2.a, win3: win3.a, win4: win4.a })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(historyGet)
