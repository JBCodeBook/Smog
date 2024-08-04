import React from 'react';
import GoogleMapsApi from './components/GoogleMaps';
import './App.css';

function App() {
  return (
    <>
      <GoogleMapsApi
        onLoad={map => {
          console.log('Map Loaded:', map);
        }}
        onUnmount={map => {
          console.log('Map unmounted:', map);
        }}
      />
    </>
  );
}

export default App;
