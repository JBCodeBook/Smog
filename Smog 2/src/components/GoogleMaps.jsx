import React, { useRef, useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import reactImg from '../assets/investment-calculator-logo.png';

const containerStyle = {
  background: '#1a73e8',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  position: 'absolute'
};

const initialCenter = {
  lat: 43.664,
  lng: -79.389
};

function GoogleMapsApi({ onLoad, onUnmount }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    language: 'en'
  });

  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    map.setCenter(initialCenter);

    if (onLoad) onLoad(map);
  }, [onLoad]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={10}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
      />
    </div>
  ) : <div>Loading...</div>;
}

export default React.memo(GoogleMapsApi);
