import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

import produce from 'immer'
import { useRouter } from 'next/router'
import fetcher from '@/_services/fetcher'

export default function useInvitation(profileId) {
  const url = profileId ? `/api/invitation/${profileId}` : null
  const { data, error, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false
  })

  console.log(data)
  // create invitation
  const createInvitation = () => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `/api/invitation/${profileId}`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      console.log(resp.data)
      mutate(resp.data)
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    invitation: data,
    isLoading: !error && !data,
    isError: error,
    createInvitation
  }
}
