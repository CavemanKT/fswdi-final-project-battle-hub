import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

import fetcher from '@/_services/fetcher'
import produce from 'immer'

export default function useCandidates(gameTitle) {

  const url = gameTitle ? `/api/candidates/${gameTitle}` : null
  const { data, error, mutate } = useSWR(url, fetcher,{
    shouldRetryOnError: false
  })



  return {
    candidates: data,
    error

  }
}
