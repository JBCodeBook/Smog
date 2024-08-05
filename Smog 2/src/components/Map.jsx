import React, { useRef, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '600px'
};

const initialCenter = {
  lat: 43.664,
  lng: -79.389
};

const Map = ({ onLoad, onUnmount, onClick }) => {
  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    map.setCenter(initialCenter);
    if (onLoad) onLoad(map);
  }, [onLoad]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialCenter}
      zoom={10}
      onLoad={onMapLoad}
      onUnmount={onUnmount}
      onClick={onClick}
      options={{
        streetViewControl: true,
      }}
    />
  );
};

export default React.memo(Map);
