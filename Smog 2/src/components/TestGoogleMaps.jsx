import React, { useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Map from './Map';
import StreetView from './StreetView';

const initialCenter = {
  lat: 43.664,
  lng: -79.389
};

function TestGoogleMaps({ onLoad = () => {}, onUnmount = () => {} }) {
    const { isLoaded, loadError } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
      language: 'en'
    });
  
    const [map, setMap] = useState(null);
  
    const handleMapLoad = useCallback((map) => {
      setMap(map);
      onLoad(map);
    }, [onLoad]);
  
    const handleMapClick = useCallback((e) => {
      if (map && map.getStreetView()) {
        map.getStreetView().setPosition(e.latLng);
        map.getStreetView().setVisible(true);
      } else {
        console.error('Street View Panorama not initialized');
      }
    }, [map]);
  
    if (loadError) {
      return <div>Error loading Google Maps API</div>;
    }
  
    return isLoaded ? (
      <div>
        <Map
          onLoad={handleMapLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
        />
        <StreetView map={map} position={initialCenter} />
      </div>
    ) : <div>Loading...</div>;
  }

export default React.memo(TestGoogleMaps);
