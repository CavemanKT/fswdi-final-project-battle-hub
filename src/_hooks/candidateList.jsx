import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'
import { useRouter } from 'next/router'
import { useState } from 'react'
import produce from 'immer'

export default function useCandidates(gameTitle) {

  const router = useRouter()
  const url = gameTitle ? `/api/candidates/${gameTitle}` : null
  const { data, error, mutate } = useSWR(url, fetcher,{
    shouldRetryOnError: false
  })

  return {
    candidates: data
  }
}
