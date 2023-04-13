import React, { useState, useEffect } from 'react';
import { getReservoirsByState, getStationName, getReservoirsAndNamesByState, getReservoirsForMap } from './apiClient';
import mapboxgl from 'mapbox-gl';
import MyMap from './components/myMap';
import Autocomplete from './components/AutoComplete';


const HomePage = () => {
  const [selectedState, setSelectedState] = useState('');
  const [siteNos, setSiteNos] = useState([]);
  const [stationNms, setStationNms] = useState([]);
  const [selectedSiteNo, setSelectedSiteNo] = useState("");
  const [selectedStationNm, setSelectedStationNm] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [searchMethod, setSearchMethod] = useState("map");

  const handleToggleMap = () => {
    setShowMap(!showMap);
  };

  const handleMapClick = (data) => {
    const { site_no, station_nm, state_code } = data;
    setSelectedSiteNo(site_no);
    setSelectedStationNm(station_nm);
    setShowMap(false);
  };

  const handleStateChange = async event => {
    const state = event.target.value;
    setSelectedState(state);
    setSiteNos([]);
    setStationNms([]);
    setSiteNos(["querying"]);
    setStationNms(["querying"]);
    if (state) {
      const data = await getReservoirsAndNamesByState(state);
      const siteNos = data.flatMap(([site_no]) => site_no);
      const stationNms = data.flatMap(([, station_nm]) => station_nm);
      setSiteNos(siteNos);
      setStationNms(stationNms);
    } else {
      setSiteNos([]);
      setStationNms([]);
    }
  };

  const handleSiteChange = (event) => {
    const selectedOption = event.target.value;
    const { site_no, station_nm } = JSON.parse(selectedOption);
    setSelectedSiteNo(site_no);
    setSelectedStationNm(station_nm);
  };

  const handleSearchMethodChange = (event) => {
    const method = event.target.value;
    setSearchMethod(method);
    setSelectedState("");
    setSelectedSiteNo("");
    setSelectedStationNm("");
    setSiteNos([]);
    setStationNms([]);
  };
  function passNameNoHomePage(name, site_no) {
    setSelectedSiteNo(site_no);
    setSelectedStationNm(name);
    console.log(name);
  }

  return (
    <div>
      <h2>Select a Search Method:</h2>
      <select value={searchMethod} onChange={handleSearchMethodChange}>
        <option value="map">Map</option>
        <option value="dropdown">nested-dropdown</option>
        <option value="autocomplete">autocomplete search box</option>
      </select>
      {searchMethod === "map" && (
        <>
          <button onClick={handleToggleMap}>
            {showMap ? "Hide Map" : "Show Map"}
        </button>
        {showMap && <MyMap onMapClick={handleMapClick} />}
        {selectedSiteNo && (
            <div>
            <h2>Selected Reservoir:</h2>
            <p>Site No: {selectedSiteNo}</p>
            <p>Station Name: {selectedStationNm}</p>
            </div>
        )}
        </>
      )}
      {searchMethod === "dropdown" && (
        <>
          <h2>Select a State:</h2>
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">--Select a State--</option>
            <option value="ca">California</option>
            <option value="nm">New Mexico</option>
            <option value="az">Arizona</option>
          </select>
          {selectedState && <h2>Site Numbers and Station Names:</h2>}
      {selectedState && (
        <select value={JSON.stringify({ site_no: selectedSiteNo, station_nm: selectedStationNm })} onChange={handleSiteChange}>
          <option value="">--Select an option--</option>
          {siteNos.map((site_no, index) => (
            <option key={site_no} value={JSON.stringify({ site_no, station_nm: stationNms[index] })}>
                {`${site_no} - ${stationNms[index]}`}
            </option>
            ))}
        </select>
        )}
        </>
      )}
       {searchMethod === "autocomplete" && (
        <>
       
          <h2>Search by Reservoir Name:</h2>
          { selectedStationNm && (
        <p>
          Selected Reservoir: {selectedStationNm} (Site No.{" "}
          {selectedSiteNo})
        </p>
      )}
          <Autocomplete passNameNo={passNameNoHomePage}/>
          
        </>
      )}
    
</div>
  );
};

export default HomePage;