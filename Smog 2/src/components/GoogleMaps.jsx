import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import useFetchAirQualityData from "./useFetchAirQualityData";
import PollutantDisplayComponent from "./PollutantDisplayComponent";

const layoutStyle = {
  display: "flex",
  height: "100vh",
  width: "100%",
  position: "relative",
};

const mapContainerStyle = {
  flex: 1,
  background: "#1a73e8",
  position: "relative",
  display: "flex",
};

const sidebarStyle = {
  width: "300px",       
  height: "100%",       
  padding: "20px",
  overflowY: "auto",    
  backgroundColor: "rgba(255, 255, 255, 0.9)", 
  boxSizing: "border-box", 
  zIndex: 10,           
};

const initialCenter = {
  lat: 43.664,
  lng: -79.389,
};

const TestGoogleMaps = ({ onLoad = () => {}, onUnmount = () => {} }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    language: "en",
  });

  const [map, setMap] = useState(null);
  const [streetViewVisible, setStreetViewVisible] = useState(false);
  const [position, setPosition] = useState(initialCenter);

  const [airQualityData, isLoading, error] = useFetchAirQualityData(position);

  useEffect(() => {
    if (airQualityData) {
      console.log("AQ data fetched after position update:", airQualityData);
    }
  }, [airQualityData]);

  const handleMapLoad = useCallback(
    (map) => {
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

      google.maps.event.addListener(panorama, "visible_changed", () => {
        const isVisible = panorama.getVisible();
        setStreetViewVisible(isVisible);

        if (isVisible) {
          const position = panorama.getPosition();
          setPosition({ lat: position.lat(), lng: position.lng() });
        }
      });
    },
    [onLoad]
  );

  const handleMapClick = useCallback(
    (e) => {
      if (map && map.getStreetView()) {
        const streetView = map.getStreetView();
        streetView.setPosition(e.latLng);
        streetView.setVisible(true);
      } else {
        console.error("Street View Panorama not initialized");
      }
    },
    [map]
  );

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return isLoaded ? (
    <div style={layoutStyle}>
      <div style={mapContainerStyle}>
        <GoogleMap
          mapContainerStyle={{ flex: 1 }}
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
          <div style={sidebarStyle}>
            {airQualityData.pollutants && (
              <PollutantDisplayComponent pollutants={airQualityData.pollutants} />
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading map...</div>
  );
};

export default React.memo(TestGoogleMaps);
