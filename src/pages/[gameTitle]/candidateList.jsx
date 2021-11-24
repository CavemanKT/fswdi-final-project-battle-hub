import CompsLayout from '@/components/layouts/Layout'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/_hooks/user'
import useCandidates from '@/_hooks/candidateList'
import login from '@/api/controllers/auth/email/login'

export default function PageCandidateList() {
  const { query: { gameTitle } } = useRouter()
  const router = useRouter()
  const { candidates, error } = useCandidates(gameTitle)
  if (router.isFallback) return <div>Loading...</div>

  return(
    <>
      <div id="candidate-list">
        <ul>
          {
            candidates && candidates.candidateList.forEach((item, i) => {
              console.log(item)
            })

          }

        </ul>

      </div>
    </>
  )

}
