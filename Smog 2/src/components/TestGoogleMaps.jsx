import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import CO2Img from '../assets/CO2.png';
import NO2Img from '../assets/NO2.png';
import O3Img from '../assets/O3.png';
import PM10Img from '../assets/PM10.png';
import fetchAirQuality from './fetchAirQuality'; 

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
  const [COViewImageUrl, setCOViewImageUrl] = useState('');
  const [NO2ViewImageUrl, setNO2ViewImageUrl] = useState('');
  const [O3ViewImageUrl, setO3ViewImageUrl] = useState('');
  const [PM10ViewImageUrl, setPM10ViewImageUrl] = useState('');
  const [position, setPosition] = useState(initialCenter); 

  const airQualityData = fetchAirQuality(position);

  const handleMapLoad = useCallback((map) => {
    setMap(map);
    onLoad(map);

    const panorama = new google.maps.StreetViewPanorama(map.getDiv(), {
      position: initialCenter,
      pov: { heading: 165, pitch: 0 },
      visible: false,
      addressControl: true,
      enableCloseButton: true,
      controlSize: 100,
    });

    map.setStreetView(panorama);

    google.maps.event.addListener(panorama, 'visible_changed', () => {
      const isVisible = panorama.getVisible();
      setStreetViewVisible(isVisible);
      if (isVisible) {
        const position = panorama.getPosition();
        setPosition({ lat: position.lat(), lng: position.lng() }); 
        const CO2ImageUrl = CO2Img;
        const NO2ImageUrl = NO2Img;
        const O3ImageUrl = O3Img;
        const PM10ImageUrl = PM10Img;
        setCOViewImageUrl(CO2ImageUrl);
        setNO2ViewImageUrl(NO2ImageUrl);
        setO3ViewImageUrl(O3ImageUrl);
        setPM10ViewImageUrl(PM10ImageUrl);

      } else {
        setCOViewImageUrl('');
        setNO2ViewImageUrl('');
        setO3ViewImageUrl('');
        setPM10ViewImageUrl('');
      }
    });
  }, [onLoad]);

  const handleMapClick = useCallback((e) => {
    if (map && map.getStreetView()) {
      const streetView = map.getStreetView();
      streetView.setPosition(e.latLng);
      streetView.setVisible(true); 
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
      {streetViewVisible && (
        <>
          <img 
            src={COViewImageUrl} 
            alt="CO2 View" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 10, 
              opacity: 0.5,
              pointerEvents: 'none' 
            }} 
          />
          <img 
            src={NO2ViewImageUrl} 
            alt="NO2 View" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 10, 
              opacity: 0.5,
              pointerEvents: 'none' 
            }} 
          />
          <img 
            src={O3ViewImageUrl} 
            alt="O3 View" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 10, 
              opacity: 0.5,
              pointerEvents: 'none' 
            }} 
          />
          <img 
            src={PM10ViewImageUrl} 
            alt="PM10 View" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 10, 
              opacity: 0.5,
              pointerEvents: 'none' 
            }} 
          />
        </>
      )}
    </div>
  ) : <div>Loading map...</div>;
}

export default React.memo(TestGoogleMaps);
