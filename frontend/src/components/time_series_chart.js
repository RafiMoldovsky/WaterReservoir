import React, { useState, useEffect, useRef } from "react";
import { getReservoirDailyOverTime } from "../apiClient";
import Chart from "chart.js/auto";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;

function TimeSeriesChart({ reservoirId }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const dailyData = await getReservoirDailyOverTime(
        reservoirId,
        "2018-01-01",
        currentDate
      );
      const chartData = createChartData(dailyData);
      setChartData(chartData);
    }
    fetchData();
  }, [reservoirId]);

  // Check if Chart object already exists and destroy it if it does
  useEffect(() => {
    const chartInstance = chartRef.current?.chartInstance;
    if (chartInstance) {
      chartInstance.destroy();
    }
  }, [reservoirId]);

  function createChartData(dailyData) {
    const chartData = {
      labels: [],
      data: [],
      trendLine: [],
    };
    const dataPoints = dailyData.map((d) => ({
      x: new Date(d[1]),
      y: d[0],
    }));
    // Convert date format to "yyyy-mm-dd"
    for (let i = 0; i < dataPoints.length; i++) {
      const date = dataPoints[i].x.toISOString().slice(0, 10);
      dataPoints[i].x = date;
    }
    const movingAvg = calculateMovingAverage(dataPoints, 7);
    for (const dp of dataPoints) {
      chartData.labels.push(dp.x);
      chartData.data.push(dp.y);
      chartData.trendLine.push(movingAvg.get(dp.x));
    }
    return chartData;
  }

  function calculateMovingAverage(dataPoints, days) {
    const movingAvg = new Map();
    let sum = 0;
    for (let i = 0; i < days - 1; i++) {
        if(dataPoints[i])
        {
            sum += dataPoints[i].y;
        }
    }
    for (let i = days - 1; i < dataPoints.length; i++) {
        if(dataPoints[i])
        {
            sum += dataPoints[i].y;
        }
      const avg = sum / days;
      movingAvg.set(dataPoints[i].x, avg);
      
      if(dataPoints[i - days + 1])
        {
            sum -= dataPoints[i - days + 1].y;
        }
    }
    return movingAvg;
  }

  useEffect(() => {
    if (chartData) {
      const ctx = chartRef.current.getContext('2d');
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Reservoir Storage",
              data: chartData.data,
              borderColor: "blue",
            },
            {
              label: "Trend-line (7-day Moving Average)",
              data: chartData.trendLine,
              borderColor: "red",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day'
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          },
          // Set height and width of chart
          height: 800,
          width: 800
        },
      });
      
      // Return a function to destroy the chart instance when component unmounts
      return () => {
        myChart.destroy();
      };
    }
  }, [chartData]);


         
  return (
    <div>
      <canvas id="chart" ref={chartRef}></canvas>
    </div>
  );
}

export default TimeSeriesChart;