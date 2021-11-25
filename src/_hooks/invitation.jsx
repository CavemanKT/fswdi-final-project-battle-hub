import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

import produce from 'immer'
import { useRouter } from 'next/router'
import fetcher from '@/_services/fetcher'

export default function useInvitation(profileId) {
  // const url = gameTitle ? `/api/candidates/${gameTitle}` : null
  // const { data, error, mutate } = useSWR(url, fetcher, {
  //   shouldRetryOnError: false
  // })

  // axios({
  //   method: 'POST',
  //   url: `/api/`
  // })
  return {
    // invitation: data,
    // isLoading: !error && !data,
    // isError: error,
    // createInvitation
  }
}
