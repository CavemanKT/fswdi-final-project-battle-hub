import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

import produce from 'immer'
import { useRouter } from 'next/router'
import fetcher from '@/_services/fetcher'

export default function useNotification(profileId) {
  const url = profileId ? `/api/notification/${profileId}` : null
  const { data, error, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false
  })

  console.log(data)

  // const notification = () => {
  //   axios({
  //     method:
  //   })
  // }

  return {
    notifications: data,
    isLoading: !error && !data,
    isError: error
  }
}
