import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '600px'
};

const initialCenter = {
  lat: 43.664,
  lng: -79.389
};

const Map = ({ onLoad, onUnmount, onClick }) => (
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={initialCenter}
    zoom={10}
    onLoad={onLoad}
    onUnmount={onUnmount}
    onClick={onClick}
    options={{
      streetViewControl: true,
      controlSize: 100,
    }}
  />
);

export default React.memo(Map);
