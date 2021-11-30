import nc from 'next-connect'

import localNotificationsGet from '@/api/controllers/notification/localNotificationGet'

export default nc()
  .get(localNotificationsGet)
