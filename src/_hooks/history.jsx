import useSWR from 'swr'
import axios from 'axios'

import produce from 'immer'
import fetcher from '@/_services/fetcher'

export default function useHistory() {
  const apiProfileHistory = (profileId) => (new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `/api/history/${profileId}`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      console.log(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    apiProfileHistory
  }
}
