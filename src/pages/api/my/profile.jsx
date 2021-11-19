import nc from 'next-connect'

import myProfileShow from '@/api/controllers/my/profile/show'

export default nc()
  .get(myProfileShow)
