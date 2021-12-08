/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LineChart = ({ historyData, winRateData }) => {
  const [collections, setCollections] = useState({
    series: [{
      name: 'win rate',
      data: [
        winRateData.win1,
        winRateData.win2,
        winRateData.win3,
        winRateData.win4
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

  useEffect(() => {
    setCollections({
      series: [{
        name: 'win rate',
        data: [
          winRateData.win1,
          winRateData.win2,
          winRateData.win3,
          winRateData.win4
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
  }, [historyData.id])

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
