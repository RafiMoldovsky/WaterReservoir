import React, { useState, useEffect } from "react";
import { getReservoirsForAutocomplete } from "../apiClient";

function Autocomplete({passNameNo}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [reservoir, setReservoir] = useState([]); // Where these reservoirs are ['site_no','station_nm']

  useEffect(() => {
    async function fetchData() {
        setInputValue("querying");
        const results = await getReservoirsForAutocomplete();
        setInputValue("");
      setReservoir(results);
      const stationNms = results.flatMap(([, station_nm]) => station_nm);
      setOptions(stationNms);
    }
    fetchData();
  }, []);

  function handleChange(event) {
    setInputValue(event.target.value);
    if (event.keyCode === 8) { // Backspace key code is 8
      setOptions(reservoir.flatMap(([, station_nm]) => station_nm));
    } else {
      const filteredOptions = reservoir.filter(
        ([, station_nm]) =>
          station_nm.toLowerCase().startsWith(event.target.value.toLowerCase())
      ).map(([, station_nm]) => station_nm);
      setOptions(filteredOptions);
    }
  }

  
  function handleOptionClick(option) {
    const selectedOption = option;
    setSelectedName(selectedOption);
    const selectedReservoir = reservoir.find((pair) => pair[1] === selectedOption);
    const selectedSiteNo = selectedReservoir ? selectedReservoir[0] : null;
    console.log(selectedOption);
    passNameNo(selectedOption, selectedSiteNo);
  }


  return (
    <div>
    <input type="text" value={inputValue} onChange={handleChange} onKeyDown={handleChange} />
    {options.length > 0 && (
      <ul>
        {options.map((option) => (
          <li key={option} onClick={() => handleOptionClick(option)} style={{ cursor: "pointer" }}>
            {option}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}

export default Autocomplete;
