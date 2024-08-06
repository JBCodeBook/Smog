import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

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

function TestGoogleMaps({ onLoad = () => {}, onUnmount = () => {} }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    language: 'en'
  });

  const [map, setMap] = useState(null);
  const [streetViewVisible, setStreetViewVisible] = useState(false);

  const handleMapLoad = useCallback((map) => {
    setMap(map);
    onLoad(map);

    const panorama = new google.maps.StreetViewPanorama(map.getDiv(), {
      position: initialCenter,
      pov: { heading: 165, pitch: 0 },
      visible: false,
      addressControl: true,
      enableCloseButton: true,
      controlSize:100,
      addressControlOptions: {
        controlSize: 100,
      }
    });

    map.setStreetView(panorama);

    google.maps.event.addListener(panorama, 'visible_changed', () => {
      const isVisible = panorama.getVisible();
      setStreetViewVisible(isVisible);
    });

  }, [onLoad]);

  const handleMapClick = useCallback((e) => {
    if (map && map.getStreetView()) {
      const streetView = map.getStreetView();
      streetView.setPosition(e.latLng);
      streetView.setVisible(true); // Show Street View
    } else {
      console.error('Street View Panorama not initialized');
    }
  }, [map]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={10}
        onLoad={handleMapLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          streetViewControl: true,
          controlSize: 75,
        }}
      />
    </div>
  ) : <div>Loading...</div>;
}

export default React.memo(TestGoogleMaps);
