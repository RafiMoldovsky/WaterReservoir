import React, { useState } from 'react';

const HomePage = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedReservoir, setSelectedReservoir] = useState('');

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleReservoirChange = (event) => {
    setSelectedReservoir(event.target.value);
  };

  return (
    <div>
      <h1>Reservoir Storage Data</h1>
      <label htmlFor="state-select">Select a state:</label>
      <select id="state-select" value={selectedState} onChange={handleStateChange}>
        <option value="">-- Select a state --</option>
        <option value="AZ">Arizona</option>
        <option value="CA">California</option>
        <option value="NM">New Mexico</option>
        {/* add more options here */}
      </select>

      {selectedState && (
        <div>
          <label htmlFor="reservoir-select">Select a reservoir:</label>
          <select id="reservoir-select" value={selectedReservoir} onChange={handleReservoirChange}>
            <option value="">-- Select a reservoir --</option>
            {/* add options for reservoirs based on selected state */}
          </select>
        </div>
      )}

      {/* add chart component here */}
    </div>
  );
};

export default HomePage;
