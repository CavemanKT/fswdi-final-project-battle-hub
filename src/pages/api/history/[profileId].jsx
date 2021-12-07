import nc from 'next-connect'

import getHistory from '@/api/controllers/history/get'

export default nc()
  .get(getHistory)
