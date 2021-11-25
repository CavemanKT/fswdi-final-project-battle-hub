import nc from 'next-connect'
import profileCreate from '@/api/controllers/profile/create'

export default nc()
  .post(profileCreate)
