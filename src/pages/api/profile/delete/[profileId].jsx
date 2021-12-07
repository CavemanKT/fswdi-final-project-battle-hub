import nc from 'next-connect'
import apiProfileDestroy from '@/api/controllers/profile/destroy'

export default nc()
  .delete(apiProfileDestroy)
