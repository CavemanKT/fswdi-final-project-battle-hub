import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

import produce from 'immer'
import { useRouter } from 'next/router'
import fetcher from '@/_services/fetcher'

export default function useHistory(profileId) {
  const url = profileId ? `/api/history/${profileId}` : null
  const { data, error, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false
  })

  console.log(profileId)
  // const createInvitation = () => (new Promise((resolve, reject) => {
  //   axios({
  //     method: 'POST',
  //     url: `/api/invitation/${profileId}`,
  //     withCredentials: true
  //   }).then((resp) => {
  //     resolve(resp)
  //     mutate(resp.data)
  //   }).catch((err) => {
  //     reject(err)
  //   })
  // }))

  const destroyHistory = () => (new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `/api/history/${profileId}`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      // mutate(resp.data)
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    history: data?.history,
    isLoading: !error && !data,
    isError: error,
    destroyHistory
  }
}
