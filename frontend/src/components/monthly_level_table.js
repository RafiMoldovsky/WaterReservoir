import React, { useState, useEffect } from "react";
import { getReservoirMonthlyOverTime } from "../apiClient";

const MonthlyLevelTable = ({ siteId }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const data = await getReservoirMonthlyOverTime(siteId);
      setMonthlyData(data);
    };

    fetchMonthlyData();
  }, [siteId]);

  const getPercentChange = (prevValue, currValue) => {
    if (prevValue === 0) return "";
    return (((currValue - prevValue) / prevValue) * 100).toFixed(2) + "%";
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>2018</th>
          <th>2019</th>
          <th>2020</th>
          <th>2021</th>
          <th>2022</th>
          <th>2023</th>
        </tr>
      </thead>
      <tbody>
        {monthlyData.map((monthData, index) => (
          <tr key={index}>
            <td>{monthData.month_year}</td>
            <td>{monthData[2018]}</td>
            <td>{monthData[2019]}</td>
            <td>{monthData[2020]}</td>
            <td>{monthData[2021]}</td>
            <td>{monthData[2022]}</td>
            <td>{monthData[2023]}</td>
            <td>
              {index > 0
                ? getPercentChange(
                    monthlyData[index - 1][monthData.month_year],
                    monthData[monthData.month_year]
                  )
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MonthlyLevelTable;
