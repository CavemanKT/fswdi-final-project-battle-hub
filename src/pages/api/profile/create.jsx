import nc from 'next-connect'
import profileCreate from '@/api/controllers/profile/create'

export const config = {
  api: {
    bodyParser: false
  }
}

export default nc()
  .post(profileCreate)
