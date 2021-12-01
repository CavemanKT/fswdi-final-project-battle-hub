import useSWR from 'swr'
import axios from 'axios'
import { resolveHref } from 'next/dist/shared/lib/router/router'

const options = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: { platform: 'pc', category: 'mmorpg', 'sort-by': 'popularity' },
  headers: {
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    'x-rapidapi-key': 'd0e7e11e66msh55c285085df5857p1dc36ejsn6f679262decb'
  }
}
const fetcher = () => axios(options).then((res) => res)

export default function useGames() {
  const { data, error } = useSWR('https://free-to-play-games-database.p.rapidapi.com/api/games', fetcher, {
    shouldRetryOnError: false
  })

  // if (data){
  //   console.log(data.data[45])
  // }
  const getGameCandidateList = (gameTitle) => (new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `/api/candidates/${gameTitle}`
    }).then((resp) => {
      resolve(resp)
      console.log('containing histories:', resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    games: data,
    isLoading: !error && !data,
    isError: error,
    getGameCandidateList
  }
}
