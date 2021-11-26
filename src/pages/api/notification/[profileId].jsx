import nc from 'next-connect'

import notificationsGet from '@/api/controllers/notification/get'

export default nc()
  .get(notificationsGet)
