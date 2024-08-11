import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import CO2Img from '../assets/CO2.png';
import NO2Img from '../assets/NO2.png';
import O3Img from '../assets/O3.png';
import PM10Img from '../assets/PM10.png';
import useFetchAirQualityData from './useFetchAirQaulityData';

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

const TestGoogleMaps = ({ onLoad = () => {}, onUnmount = () => {} }) => {
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

  const [airQualityData, isLoading, error] = useFetchAirQualityData(position);

  useEffect(() => {
    if (airQualityData) {
      console.log("AQ data fetched after position update:", airQualityData);
    }
  }, [airQualityData]);

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
        <div
          className="grid gap-4 grid-cols-3 grid-rows-3"
          style={{ 
            padding: 10, 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 15, 
            pointerEvents: 'none' 
          }}
        >
        {/* CO2 View Image */}
        <img
            src={CO2Img}
            alt="CO2 View"
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          />

          {/* NO2 View Image */}
          <img
            src={NO2Img}
            alt="NO2 View"
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          />

          {/* O3 View Image */}
          <img
            src={O3Img}
            alt="O3 View"
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          />

          {/* PM10 View Image */}
          <img
            src={PM10Img}
            alt="PM10 View"
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          />


          {/* Pollutant Information */}
          {airQualityData.pollutants && airQualityData.pollutants.map(pollutant => (
            <div key={pollutant.code} style={{ gridColumn: 'span 3', gridRow: 'span 1', zIndex: 20 }}>
              <h4 style={{ fontSize: '24px', color: 'black' }}>{pollutant.displayName} ({pollutant.fullName})</h4>
              <p style={{ fontSize: '14px', color: 'black' }}>Concentration: {pollutant.concentration.value} {pollutant.concentration.units}</p>
              <p style={{ fontSize: '14px', color: 'black' }}>Sources: {pollutant.additionalInfo.sources}</p>
              <p style={{ fontSize: '14px', color: 'black' }}>Effects: {pollutant.additionalInfo.effects}</p>
            </div>
          ))}

          {/* Health Recommendations */}
          {airQualityData.healthRecommendations && (
            <div style={{ gridColumn: 'span 3', gridRow: 'span 1', marginTop: '10px', zIndex: 20 }}>
              <h4 style={{ fontSize: '24px', color: 'blue' }}>Health Recommendations:</h4>
              <p style={{ fontSize: '14px', color: 'blue' }}>General Population: {airQualityData.healthRecommendations.generalPopulation}</p>
              <p style={{ fontSize: '14px', color: 'blue' }}>Elderly: {airQualityData.healthRecommendations.elderly}</p>
              <p style={{ fontSize: '14px', color: 'blue' }}>People with Lung Disease: {airQualityData.healthRecommendations.lungDiseasePopulation}</p>
            </div>
          )}

          {/* Date and Region Information */}
          <div style={{ gridColumn: 'span 3', gridRow: 'span 1', marginTop: '10px', zIndex: 20 }}>
            <p style={{ fontSize: '14px', color: 'black' }}>Data retrieved on: {new Date(airQualityData.dateTime).toLocaleString()}</p>
            <p style={{ fontSize: '14px', color: 'black' }}>Region Code: {airQualityData.regionCode.toUpperCase()}</p>
          </div>
        </div>
      )}
    </div>
  ) : <div>Loading map...</div>;
};

export default React.memo(TestGoogleMaps);
