import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

import produce from 'immer'
import fetcher from '@/_services/fetcher'

export default function useCandidates(gameTitle, page = 1) {
  const url = gameTitle ? `/api/candidates/${gameTitle}/${page}` : null
  const { data, error, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false
  })

  console.log(gameTitle, data)
  return {
    candidates: data,
    isLoading: !error && !data,
    isError: error
  }
}
