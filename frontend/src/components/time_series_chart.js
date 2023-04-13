import React, { useState, useEffect } from "react";
import { getReservoirDailyOverTime } from "../apiClient";
import Chart from "chart.js/auto";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;

function TimeSeriesChart({ reservoirId }) {
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

  function createChartData(dailyData) {
    const chartData = {
      labels: [],
      data: [],
      trendLine: [],
    };
    const dataPoints = dailyData.map((d) => ({
      x: new Date(d[0]),
      y: d[1],
    }));
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
      sum += dataPoints[i].y;
    }
    for (let i = days - 1; i < dataPoints.length; i++) {
      sum += dataPoints[i].y;
      const avg = sum / days;
      movingAvg.set(dataPoints[i].x, avg);
      sum -= dataPoints[i - days + 1].y;
    }
    return movingAvg;
  }

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById("chart").getContext("2d");
      new Chart(ctx, {
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
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      <canvas id="chart"></canvas>
    </div>
  );
}

export default TimeSeriesChart;
