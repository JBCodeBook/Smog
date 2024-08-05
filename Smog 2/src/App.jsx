import React from 'react';
import GoogleMapsApi from './components/GoogleMapsApi';
import './App.css';
import TestGoogleMaps from './components/TestGoogleMaps';

function App() {
  return (
    <>
    <TestGoogleMaps/>
      {/* <GoogleMapsApi
        onLoad={map => {
          console.log('Map Loaded:', map);
        }}
        onUnmount={map => {
          console.log('Map unmounted:', map);
        }}
      /> */}
    </>
  );
}

export default App;
