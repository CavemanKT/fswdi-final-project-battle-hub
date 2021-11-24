import CompsLayout from '@/components/layouts/Layout'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/_hooks/user'
import useCandidates from '@/_hooks/candidateList'

export default function PageCandidateList() {
  const { query: { gameId } } = useRouter()
  const router = useRouter()
  console.log(gameId);
  const { candidates, error } = useCandidates(gameId)
  if (router.isFallback) return <div>Loading...</div>

  console.log(candidates);
  return(
    <div>asdf</div>
  )

}
