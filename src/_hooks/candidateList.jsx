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

  // const getCandidateProfile = (id) => ( new Promise((resolve, reject) => {
  //   axios({
  //     method: 'GET',
  //     url:``,
  //     withCredentials: true
  //   })
  // }))
  return {
    candidates: data
  }
}
