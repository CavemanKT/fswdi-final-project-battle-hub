import nc from 'next-connect'

import getCandidateList from '@/api/controllers/candidates/get'

export default nc()
  .get(getCandidateList)
