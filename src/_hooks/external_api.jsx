import axios from 'axios'
import { useState } from 'react'

export default function useExternalApi() {

  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: {platform: 'pc', category: 'mmorpg', 'sort-by': 'popularity'},
    headers: {
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
      'x-rapidapi-key': 'd0e7e11e66msh55c285085df5857p1dc36ejsn6f679262decb'
    }
  }
  const apiGetGames = () => {
    axios.request(options).then(function (resp) {
      console.log(resp);
    }).catch(function (err) {
      console.log(err);
    });
  }

  return {
    apiGetGames
  }
}
