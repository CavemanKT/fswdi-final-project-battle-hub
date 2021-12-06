import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'
import useHistory from '@/_hooks/history'
import useInvitation from '@/_hooks/invitation'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const PageLineChart = () => {
  const router = useRouter()
  const { query: { profileId } } = router // query => profileId
  const { history, isLoading: isHistoryLoading, isError: isHistoryError } = useHistory(profileId)
  // const { invitation, isLoading, isError } = useInvitation(profileId)
  console.log(history)

  const [collections, setCollections] = useState({
    series: [{
      name: 'win rate',
      data: [1, 2, 3, 4]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: `character ${1}'s Performance by Month - Winning Rate`,
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Season1', 'Season2', 'Season3', 'Season4']
      }
    }
  })

  if (isHistoryLoading) return null
  const amount1 = {}
  const amount2 = {}
  const amount3 = {}
  const amount4 = {}

  const timeIndex1 = []
  const timeIndex2 = []
  const timeIndex3 = []
  const timeIndex4 = []

  const win1 = {}
  const win2 = {}
  const win3 = {}
  const win4 = {}

  const handleTime1 = (date1, date2, date3, timeIndexCollection) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < history.length; i++) {
      if (history[i].result === 'won' && ((`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date1 || (`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date2 || (`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date3)) {
        amount1.won = amount1.won ? amount1.won + 1 : 1
      }
      if (history[i].result === 'lost' && ((`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date1 || (`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date2 || (`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date3)) {
        amount1.lost = amount1.lost ? amount1.lost + 1 : 1
      }
      if (history[i].result === 'draw' && ((`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date1 || (`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date2 || (`${history[i].createdAt.split('-')[0]}-${history[i].createdAt.split('-')[1]}`) === date3)) {
        amount1.draw = amount1.draw ? amount1.draw + 1 : 1
      }
    }

    // continue from here

    // console.log(index)
    if (index !== -1) {
      timeIndexCollection.push(index)
      amount1[history[index].result] = amount1[history[index].result] ? amount1[history[index].result] + 1 : 1
      history.splice(index, 1)
      return handleTime1(date1, date2, date3, timeIndexCollection)
    }
    if (amount1.won) {
      const sum = timeIndexCollection.length
      return amount1.won / sum
    }
    return Number(0)
  }

  const handleTime2 = (date1, date2, date3, timeIndexCollection) => {
    const index = history.findIndex((item) => (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date1
      || (item.createdAt.split('-')[0] + item.createdAt.split('-')[1]) === date2
      || (item.createdAt.split('-')[0] + item.createdAt.split('-')[1]) === date3)
    // console.log(index)
    if (index !== -1) {
      timeIndexCollection.push(index)
      amount2[history[index].result] = amount2[history[index].result] ? amount2[history[index].result] + 1 : 1
      history.splice(index, 1)
      return handleTime2(date1, date2, date3, timeIndexCollection)
    }
    if (amount2.won) {
      const sum = timeIndexCollection.length
      return amount2.won / sum
    }
    return Number(0)
  }

  const handleTime3 = (date1, date2, date3, timeIndexCollection) => {
    const index = history.findIndex((item) => (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date1
      || (item.createdAt.split('-')[0] + item.createdAt.split('-')[1]) === date2
      || (item.createdAt.split('-')[0] + item.createdAt.split('-')[1]) === date3)
    // console.log(index)
    if (index !== -1) {
      timeIndexCollection.push(index)
      amount3[history[index].result] = amount3[history[index].result] ? amount3[history[index].result] + 1 : 1
      history.splice(index, 1)
      return handleTime3(date1, date2, date3, timeIndexCollection)
    }
    if (amount3.won) {
      const sum = timeIndexCollection.length
      return amount3.won / sum
    }
    return Number(0)
  }

  const handleTime4 = (date1, date2, date3, timeIndexCollection) => {
    const index = history.findIndex((item) => (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date1
      || (item.createdAt.split('-')[0] + item.createdAt.split('-')[1]) === date2
      || (item.createdAt.split('-')[0] + item.createdAt.split('-')[1]) === date3)
    // console.log(index)
    if (index !== -1) {
      timeIndexCollection.push(index)
      amount4[history[index].result] = amount4[history[index].result] ? amount4[history[index].result] + 1 : 1
      history.splice(index, 1)
      return handleTime4(date1, date2, date3, timeIndexCollection)
    }
    if (amount4.won) {
      const sum = timeIndexCollection.length
      return amount4.won / sum
    }
    return Number(0)
  }

  win1.a = handleTime1('2010-01', '2010-02', '2010-03', timeIndex1)
  win2.b = handleTime2('2010-04', '2010-05', '2010-06', timeIndex2)
  win3.c = handleTime3('2010-07', '2010-08', '2010-09', timeIndex3)
  win4.d = handleTime4('2010-10', '2010-11', '2010-12', timeIndex4)
  // console.log('winningRate1: ', win1.a)
  // console.log('winningRate2: ', win2.b)
  // console.log('winningRate3: ', win3.c)
  // console.log('winningRate4: ', win4.d)
  const newData = [win1.a, win2.b, win3.c, win4.d]

  setCollections(
    {
      series: [{
        name: 'win rate',
        data: newData
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: `character ${history.characterName}'s Performance by Month - Winning Rate`,
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ['Season1', 'Season2', 'Season3', 'Season4']
        }
      }
    }
  )

  return (
    <div id="chart">
      <Chart
        options={collections.options}
        series={collections.series}
        type="line"
        height={350}
      />
    </div>
  )
}

export default PageLineChart
