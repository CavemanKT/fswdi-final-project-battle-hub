import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

// figured out how to do it.
const amount1 = {}
const amount2 = {}
const amount3 = {}
const amount4 = {}
let total1 = null
const total2 = null
const total3 = null
const total4 = null
const timeIndex1 = []
const timeIndex2 = []
const timeIndex3 = []
const timeIndex4 = []

const LineChart = ({ data }) => {
  const [winningRate, setWinningRate] = useState(null)

  const handleData = () => {
    // eslint-disable-next-line array-callback-return
    data.Histories.map((item) => {
      amount[item.result] = amount[item.result] ? amount[item.result] + 1 : 1
    })
    total = amount.won + amount.lost + amount.draw
  }

  const handleTime1 = () => {
    const index = data.Histories.findIndex((item) => (`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`) === '2010-01'
      || (item.createdAt.split('-')[0] + item.createdAt.split('-')[1]) === '2010-02'
      || (item.createdAt.split('-')[0] + item.createdAt.split('-')[1]) === '2010-03')
    console.log(index)
    if (index !== -1) {
      timeIndex1.push(index)
      amount[data.Histories[index].result] = amount[data.Histories[index].result] ? amount[data.Histories[index].result] + 1 : 1
      data.Histories.splice(index, 1)
      return handleTime1()
    }
    return [amount, timeIndex1]
  }

  useEffect(async () => {
    total1 = amount.won + amount.lost + amount.draw
    setWinningRate1(amount.won / total1)
    console.log(winningRate)
    handleTime1()
  }, [data])

  const [collections, setCollections] = useState({
    series: [{
      name: 'win rate',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100, 123, 102]
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
        text: `character ${data.characterName}'s Performance by Month - Winning Rate`,
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }
  })
  console.log(data)

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
