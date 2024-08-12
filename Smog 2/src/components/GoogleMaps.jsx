import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import CO2Img from "../assets/CO2.png";
import NO2Img from "../assets/NO2.png";
import O3Img from "../assets/O3.png";
import PM10Img from "../assets/PM10.png";
import useFetchAirQualityData from "./useFetchAirQualityData";
import PollutantDisplayComponent from "./PollutantDisplayComponent";
import InfoCard from "./InfoCard";

const layoutStyle = {
  display: "flex",
  height: "100vh",
  width: "100%",
  position: "relative",
};

const mapContainerStyle = {
  flex: 1, // Flex-grow the map to take up available space
  background: "#1a73e8",
  position: "relative", // Keep the map position relative
  zIndex: 10,
};

const sidebarStyle = {
  position: "absolute",
  top: "100px",         // Position it from the top of the parent container
  left: 0,
  width: "250px",       // Fixed width for the sidebar
  bottom: "20px",       // Add bottom spacing to avoid overflow
  zIndex: 400,
  padding: "20px",
  overflowY: "auto",    // Allow scrolling if the content overflows the sidebar height
  boxSizing: "border-box", // Include padding in height calculations
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
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
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
          <div style={sidebarStyle}>
            {airQualityData.pollutants && (
              <PollutantDisplayComponent pollutants={airQualityData.pollutants} />
            )}
          </div>

          {/* <div className="flex flex-rows-2 flex-cols-3 justify-items-center absolute bottom-[16px] left-[250px] right-[250px] h-80 p-5 z-30">
            {console.log("HEalinfo: ", airQualityData.healthRecommendations)}
            {airQualityData.healthRecommendations && (
              <InfoCard healthInformation={airQualityData.healthRecommendations} />)}
          </div> */}
        </>
      )}
    </div>
  ) : (
    <div>Loading map...</div>
  );
};

export default React.memo(TestGoogleMaps);
