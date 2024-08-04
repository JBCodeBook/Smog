import React, { useRef, useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import reactImg from '../assets/investment-calculator-logo.png';

const containerStyle = {
  width: '800px',
  height: '600px'
};

const center = {
  lat: 43.664,
  lng: -79.389
};

const initialCenter = {
  lat: -3.745,
  lng: -38.523
};

function GoogleMapsApi({ onLoad, onUnmount }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    language: 'en'
  });

  const mapRef = useRef(null);
  const streetViewRef = useRef(null);
  const [streetViewPanorama, setStreetViewPanorama] = useState(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    onLoad(map);

    if (window.google && window.google.maps) {
      const panorama = new window.google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: initialCenter,
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
        }
      );

      map.setStreetView(panorama);
      setStreetViewPanorama(panorama);
    } else {
      console.error('Google Maps JavaScript API not loaded correctly');
    }
  }, [onLoad]);

  const onMapClick = useCallback((e) => {
    if (streetViewPanorama) {
      streetViewPanorama.setPosition(e.latLng);
      streetViewPanorama.setVisible(true);
    } else {
      console.error('Street View Panorama not initialized');
    }
  }, [streetViewPanorama]);

  useEffect(() => {
    if (streetViewPanorama && streetViewRef.current) {
      const imgElement = document.createElement('img');
      imgElement.src = reactImg;
      imgElement.alt = 'Overlay';
      imgElement.style.width = '100%';
      imgElement.style.height = '100%';
      imgElement.style.opacity = '0.5';
      imgElement.style.position = 'absolute';
      imgElement.style.top = '0';
      imgElement.style.left = '0';
      imgElement.style.zIndex = '1'; // Ensure the image is on top
      imgElement.style.pointerEvents = 'none'; // Allow click-through

      streetViewRef.current.style.position = 'relative';
      streetViewRef.current.appendChild(imgElement);
    }
  }, [streetViewPanorama]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={{
          streetViewControl: true,
        }}
      />
      <div ref={streetViewRef} style={{ width: '800px', height: '600px' }} />
    </div>
  ) : <div>Loading...</div>;
}

export default React.memo(GoogleMapsApi);
