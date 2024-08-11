import React from 'react';
import GoogleMaps from './components/GoogleMaps';
import './App.css';

function App() {
  return (
    <>
      <GoogleMaps
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
