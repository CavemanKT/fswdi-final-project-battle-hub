/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LineChart = ({ historyData, winRateData }) => {
  const [collections, setCollections] = useState({
    series: [{
      name: 'win rate',
      data: [
        1,
        2,
        3,
        4
      ]
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
        text: `character ${historyData.characterName}'s Performance by Month - Winning Rate`,
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

  // figured out how to do it.
  // const amount1 = {}
  // const amount2 = {}
  // const amount3 = {}
  // const amount4 = {}

  // const timeIndex1 = []
  // const timeIndex2 = []
  // const timeIndex3 = []
  // const timeIndex4 = []

  // const win1 = {}
  // const win2 = {}
  // const win3 = {}
  // const win4 = {}

  // const handleTime1 = (date1, date2, date3, timeIndexCollection) => {
  //   const index = historyData.Histories.findIndex((item) => (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date1
  //     || (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date2
  //     || (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date3)
  //   if (index !== -1) {
  //     timeIndexCollection.push(index)
  //     amount1[historyData.Histories[index].result] = amount1[historyData.Histories[index].result] ? amount1[historyData.Histories[index].result] + 1 : 1
  //     historyData.Histories.splice(index, 1)
  //     return handleTime1(date1, date2, date3, timeIndexCollection)
  //   }
  //   if (amount1.won) {
  //     const sum = timeIndexCollection.length
  //     return amount1.won / sum
  //   }
  //   return Number(0)
  // }

  // const handleTime2 = (date1, date2, date3, timeIndexCollection) => {
  //   const index = historyData.Histories.findIndex((item) => (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date1
  //     || (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date2
  //     || (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date3)
  //   if (index !== -1) {
  //     timeIndexCollection.push(index)
  //     amount2[historyData.Histories[index].result] = amount2[historyData.Histories[index].result] ? amount2[historyData.Histories[index].result] + 1 : 1
  //     historyData.Histories.splice(index, 1)
  //     return handleTime2(date1, date2, date3, timeIndexCollection)
  //   }
  //   if (amount2.won) {
  //     const sum = timeIndexCollection.length
  //     return amount2.won / sum
  //   }
  //   return Number(0)
  // }

  // const handleTime3 = (date1, date2, date3, timeIndexCollection) => {
  //   const index = historyData.Histories.findIndex((item) => (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date1
  //     || (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date2
  //     || (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date3)
  //   if (index !== -1) {
  //     timeIndexCollection.push(index)
  //     amount3[historyData.Histories[index].result] = amount3[historyData.Histories[index].result] ? amount3[historyData.Histories[index].result] + 1 : 1
  //     historyData.Histories.splice(index, 1)
  //     return handleTime3(date1, date2, date3, timeIndexCollection)
  //   }
  //   if (amount3.won) {
  //     const sum = timeIndexCollection.length
  //     return amount3.won / sum
  //   }
  //   return Number(0)
  // }

  // const handleTime4 = (date1, date2, date3, timeIndexCollection) => {
  //   const index = historyData.Histories.findIndex((item) => (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date1
  //     || (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date2
  //     || (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === date3)
  //   if (index !== -1) {
  //     timeIndexCollection.push(index)
  //     amount4[historyData.Histories[index].result] = amount4[historyData.Histories[index].result] ? amount4[historyData.Histories[index].result] + 1 : 1
  //     historyData.Histories.splice(index, 1)
  //     return handleTime4(date1, date2, date3, timeIndexCollection)
  //   }
  //   if (amount4.won) {
  //     const sum = timeIndexCollection.length
  //     return amount4.won / sum
  //   }
  //   return Number(0)
  // }

  // useEffect(() => {
  //   win1.a = handleTime1('2010-01', '2010-02', '2010-03', timeIndex1)
  //   win2.b = handleTime2('2010-04', '2010-05', '2010-06', timeIndex2)
  //   win3.c = handleTime3('2010-07', '2010-08', '2010-09', timeIndex3)
  //   win4.d = handleTime4('2010-10', '2010-11', '2010-12', timeIndex4)
  //   console.log(historyData)
  //   console.log('winningRate1: ', win1.a)
  //   console.log('winningRate2: ', win2.b)
  //   console.log('winningRate3: ', win3.c)
  //   console.log('winningRate4: ', win4.d)
  //   const newData = [win1.a, win2.b, win3.c, win4.d]
  //   setCollections(
  //     {
  //       series: [{
  //         name: 'win rate',
  //         data: newData
  //       }],
  //       options: {
  //         chart: {
  //           height: 350,
  //           type: 'line',
  //           zoom: {
  //             enabled: false
  //           }
  //         },
  //         dataLabels: {
  //           enabled: false
  //         },
  //         stroke: {
  //           curve: 'straight'
  //         },
  //         title: {
  //           text: `character ${historyData.characterName}'s Performance by Month - Winning Rate`,
  //           align: 'left'
  //         },
  //         grid: {
  //           row: {
  //             colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //             opacity: 0.5
  //           }
  //         },
  //         xaxis: {
  //           categories: ['Season1', 'Season2', 'Season3', 'Season4']
  //         }
  //       }
  //     }
  //   )
  // }, [historyData.id])

  const amount1 = {}
  const amount2 = {}
  const amount3 = {}
  const amount4 = {}

  const handleTime1 = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < winRateData?.historySeason1.length; i++) {
      if (winRateData?.historySeason1[i].result === 'won') {
        amount1.won = amount1.won ? amount1.won + 1 : 1
      }
      if (winRateData?.historySeason1[i].result === 'lost') {
        amount1.lost = amount1.lost ? amount1.lost + 1 : 1
      }
      if (winRateData?.historySeason1[i].result === 'draw') {
        amount1.draw = amount1.draw ? amount1.draw + 1 : 1
      }
    }
    if (!amount1.lost) {
      amount1.lost = 0
    }
    if (!amount1.draw) {
      amount1.draw = 0
    }
    if (amount1.won) {
      return amount1.won / (amount1.won + amount1.lost + amount1.draw)
    }
    return Number(0)
  }
  const handleTime2 = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < winRateData?.historySeason2.length; i++) {
      if (winRateData?.historySeason2[i].result === 'won') {
        amount2.won = amount2.won ? amount2.won + 1 : 1
      }
      if (winRateData?.historySeason2[i].result === 'lost') {
        amount2.lost = amount2.lost ? amount2.lost + 1 : 1
      }
      if (winRateData?.historySeason2[i].result === 'draw') {
        amount2.draw = amount2.draw ? amount2.draw + 1 : 1
      }
    }
    if (!amount2.lost) {
      amount2.lost = 0
    }
    if (!amount2.draw) {
      amount2.draw = 0
    }
    if (amount2.won) {
      return amount2.won / (amount2.won + amount2.lost + amount2.draw)
    }
    return Number(0)
  }
  const handleTime3 = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < winRateData?.historySeason3.length; i++) {
      if (winRateData?.historySeason3[i].result === 'won') {
        amount3.won = amount3.won ? amount3.won + 1 : 1
      }
      if (winRateData?.historySeason3[i].result === 'lost') {
        amount3.lost = amount3.lost ? amount3.lost + 1 : 1
      }
      if (winRateData?.historySeason3[i].result === 'draw') {
        amount3.draw = amount3.draw ? amount3.draw + 1 : 1
      }
    }
    if (!amount3.lost) {
      amount3.lost = 0
    }
    if (!amount3.draw) {
      amount3.draw = 0
    }
    if (amount3.won) {
      return amount3.won / (amount3.won + amount3.lost + amount3.draw)
    }
    return Number(0)
  }
  const handleTime4 = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < winRateData?.historySeason4.length; i++) {
      if (winRateData?.historySeason4[i].result === 'won') {
        amount4.won = amount4.won ? amount4.won + 1 : 1
      }
      if (winRateData?.historySeason4[i].result === 'lost') {
        amount4.lost = amount4.lost ? amount4.lost + 1 : 1
      }
      if (winRateData?.historySeason4[i].result === 'draw') {
        amount4.draw = amount4.draw ? amount4.draw + 1 : 1
      }
    }
    if (!amount4.lost) {
      amount4.lost = 0
    }
    if (!amount4.draw) {
      amount4.draw = 0
    }
    if (amount4.won) {
      return amount4.won / (amount4.won + amount4.lost + amount4.draw)
    }
    return Number(0)
  }

  useEffect(() => {
    const win1 = handleTime1()
    const win2 = handleTime2()
    const win3 = handleTime3()
    const win4 = handleTime4()
    console.log('winningRate1: ', win1)
    console.log('winningRate2: ', win2)
    console.log('winningRate3: ', win3)
    console.log('winningRate4: ', win4)

    console.log(winRateData)
    setCollections({
      series: [{
        name: 'win rate',
        data: [
          win1,
          win2,
          win3,
          win4
        ]
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
          text: `character ${historyData.characterName}'s Performance by Month - Winning Rate`,
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
    }, [historyData.id])
  })

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

export default LineChart
