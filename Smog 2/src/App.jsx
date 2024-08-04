import React from 'react';
import GoogleMapsApi from './components/GoogleMaps';
import './App.css';

function App() {
  return (
    <>
      <GoogleMapsApi
        onLoad={map => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
        }}
        onUnmount={map => {
          // Do your stuff before the map is unmounted
        }}
      />
    </>
  );
}

export default App;
