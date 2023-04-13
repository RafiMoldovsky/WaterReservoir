import { getReservoirMonthlyOverTime } from "../apiClient";
import React, { useState, useEffect } from "react";

const MonthlyLevelTable = ({ siteId }) => {
  const [yearData, setYearData] = useState([]);
  const [monthlyData, setMonthData] = useState([]);
  const [volumeData, setVolume] = useState([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const data = await getReservoirMonthlyOverTime(siteId);
    const years = [];
    const months = [];
    const volumes = [];

    data.forEach(d => {
      const [year, month, vol] = d;
      years.push(year);
      months.push(month);
      volumes.push(vol);
    });

    setYearData(years);
    setMonthData(months);
    setVolume(volumes);
    };
    
    fetchMonthlyData();
  }, [siteId]);
  

  const getPercentChange = (prevValue, currValue) => {
    if (prevValue === 0) return "0";
    return (((currValue - prevValue) / prevValue) * 100).toFixed(2) + "%";
  };
  const years = ["2018", "2019", "2020", "2021", "2022", "2023"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = months.map((month,i) =>
  {

    const row=[months[i]];
    for(var j=0; j<6; j++)
    {
        var index = j*12+i;
        if (i > 2 && j===5){continue;} 
        const volume = volumeData[index];
        const prevVolume = index > 0 ? volumeData[index - 1] : 0;
        const percentChange = getPercentChange(prevVolume, volume);
        row.push(volume, percentChange);

    }
    return row;

  });



  return (
    <table cellpadding="10" cellspacing="5">
      <thead>
        <tr>
          <th>Month</th>
          {years.map((year, index) => (
            <React.Fragment key={index}>
              <th>{years[index]}</th>
              <th>% Change</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {row.map((cell, i) => (
              <td key={`${index}-${i}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MonthlyLevelTable;