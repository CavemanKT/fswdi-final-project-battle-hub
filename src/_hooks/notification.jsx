import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

import produce from 'immer'
import { useRouter } from 'next/router'
import fetcher from '@/_services/fetcher'

export default function useNotification(user) {
  const url = user ? `/api/notification/${user.Profile.id}` : null
  const { data, error, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false
  })

  const [notificationContent, setNotificationContent] = useState([])

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
