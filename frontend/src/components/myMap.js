import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { getReservoirsForMap } from '../apiClient';
import "mapbox-gl/dist/mapbox-gl.css"

function Map({ onMapClick }) {
  const [map, setMap] = useState(null);
  const [selectedMapReservoirs, setSelectedMapReservoirs] = useState([]);

  useEffect(() => {
    async function fetchReservoirsForMap() {
      try {
        const reservoirs = await getReservoirsForMap();
        setSelectedMapReservoirs(reservoirs);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReservoirsForMap();
  }, []);

  useEffect(() => {
    if (map) {
      selectedMapReservoirs.forEach(reservoir => {
        const [ site_no, station_nm, dec_lat_va, dec_long_va, state_code ] = reservoir;
        const marker = new mapboxgl.Marker()
          .setLngLat([dec_long_va, dec_lat_va])
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${station_nm}</h3><p>Site Number: ${site_no}</p>`))
          .addTo(map);
        marker._data = { site_no, station_nm, state_code };
        marker.getElement().addEventListener('click', () => {
          onMapClick(marker._data);
        });
      });
    }
  }, [selectedMapReservoirs, map]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2Ftc29uLW0iLCJhIjoiY2xnZXY4eHcxMnA2NzNsbzc4dzJsdWlxaSJ9.UZzP0JW17WbuXQ4kxaFAIg';
    if (!map) {
      setMap(new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.5795, 39.8283],
        zoom: 3
      }));
    }
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  // useEffect(() => {
  //   if (map && document.getElementById('map')) {
  //     map.on('click', e => {
  //       const { lng, lat } = e.lngLat;
  //       const roundedLng = Number(lng.toFixed(7)); // round to 7 decimal places
  //       const roundedLat = Number(lat.toFixed(7));
  //       console.log(lng, lat);
  //       const selectedReservoir = selectedMapReservoirs.find(reservoir => {
  //         return reservoir.dec_long_va === roundedLng && reservoir.dec_lat_va === roundedLat;
  //       });
  //       if (selectedReservoir) {
  //         console.log(selectedReservoir);
  //         const [ site_no, station_nm, dec_lat_va, dec_long_va, state_code ] = selectedReservoir;
  //         onMapClick(site_no, station_nm, state_code);
  //       }
  //     });
  //   }
  // }, [map, onMapClick, selectedMapReservoirs]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default Map;
