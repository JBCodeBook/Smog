// GoogleMapComponent.jsx
import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import CustomStreetViewPanorama from './CustomStreetViewnk';

const libraries = ['places'];

const containerStyle = {
  background: '#1a73e8',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  position: 'absolute'
};

const initialCenter = {
  lat: -34.397,
  lng: 150.644,
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: true,
};

const GoogleMapsApi = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    id: 'google-map-script',
    preventGoogleFontsLoading: true,
  });

  const [map, setMap] = useState(null);
  const [streetView, setStreetView] = useState(null);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    setStreetView(mapInstance.getStreetView());

    mapInstance.getStreetView().addListener('visible_changed', () => {
      const isVisible = mapInstance.getStreetView().getVisible();
      if (isVisible) {
        setStreetView(mapInstance.getStreetView());
      } else {
        setStreetView(null);
      }
    });
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={10}
        onLoad={onMapLoad}
        options={mapOptions}
      />
      <CustomStreetViewPanorama 
        map={map}
        isLoaded={isLoaded}
        options={{
          position: initialCenter,
          pov: { heading: 165, pitch: 0},
          zoom: 1,
          visible: true,
        }}
        onLoad={(panorama) => console.log('Panorama loaded:', panorama)}
        onVisibleChanged={(visible) => console.log('Visibility changed:', visible)}
      />
    </div>
  );
};

export default GoogleMapsApi;
