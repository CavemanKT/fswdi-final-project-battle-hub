import nc from 'next-connect'

import getHistory from '@/api/controllers/history/get'
// import deleteHistory from '@/api/controllers/history/deleteOne'

export default nc()
  .get(getHistory)
  // .destroy(deleteHistory)
