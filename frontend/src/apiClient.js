import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const getReservoirsByState = async (state) => {
    try {
      const response = await apiClient.get(`/api/get-reservoirs-by-state/${state}/`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export const getStationName = async (siteNo) => {
    try {
      const response = await apiClient.get(`/api/get-station-name/${siteNo}/`);
      return response.data.stationName;
    } catch (error) {
      console.error(error);
    }
  };
  export const getReservoirsAndNamesByState = async (state) => {
    try {
      const response = await apiClient.get(`/api/reservoirs-with-station-names/${state}/`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  export const getReservoirsForMap = async () => {
    try {
      const response = await apiClient.get(`/api/reservoirs-for-map/`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  export const getReservoirsForAutocomplete = async () => {
    try {
      const response = await apiClient.get(`/api/reservoirs-for-autocomplete/`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  export const getReservoirDailyOverTime = async (site_no, start_date, end_date) => {
    try {
      const response = await apiClient.get(`/api/get_reservoir_daily_over_time/${site_no}/${start_date}/${end_date}/`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  export const getReservoirMonthlyOverTime = async (site_no) => {
    try {
      const response = await apiClient.get(`/api/get_reservoir_daily_over_time/${site_no}/`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  

// Add other API requests here
// Example:
// export const getReservoirsByState = (stateCode) => {
//   return apiClient.get(`/api/get-reservoirs-by-state/${stateCode}`)
//     .then(response => response.data)
//     .catch(error => console.log(error));
// };

export default apiClient;
