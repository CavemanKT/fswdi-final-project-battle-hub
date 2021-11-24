import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'
import { useRouter } from 'next/router'
import { useState } from 'react'
import produce from 'immer'

export default function useCandidates(id) {
  console.log(id);   // 226 returned

  const router = useRouter()
  const url = id ? `/api/candidates/${id}` : null
  const { data, error, mutate } = useSWR(url, fetcher,{
    shouldRetryOnError: false
  })
  console.log(data);

  return {
    candidates: data
  }
}
