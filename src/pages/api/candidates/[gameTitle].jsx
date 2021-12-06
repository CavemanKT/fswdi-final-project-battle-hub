import nc from 'next-connect'

import getCandidateList from '@/api/controllers/candidates/getAll'

export default nc()
  .get(getCandidateList)
