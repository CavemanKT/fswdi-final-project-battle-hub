import useSWR from 'swr'
import axios from 'axios'

import produce from 'immer'
import fetcher from '@/_services/fetcher'

export default function useHistory(profileId) {
  const url = profileId ? `/api/history/${profileId}` : null
  const { data, error, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false
  })

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
    data,
    isLoading: !error && !data,
    isError: error,
    destroyHistory
  }
}
