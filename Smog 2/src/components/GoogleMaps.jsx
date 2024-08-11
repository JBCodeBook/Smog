import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import CO2Img from "../assets/CO2.png";
import NO2Img from "../assets/NO2.png";
import O3Img from "../assets/O3.png";
import PM10Img from "../assets/PM10.png";
import useFetchAirQualityData from "./useFetchAirQaulityData";

const containerStyle = {
  background: "#1a73e8",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  position: "absolute",
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
    <div style={containerStyle}>
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
          className="relative"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 15,
            pointerEvents: "none",
          }}
        >
          {/* Overlay Images */}
          <img
            src={CO2Img}
            alt="CO2 View"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          <img
            src={NO2Img}
            alt="NO2 View"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          <img
            src={O3Img}
            alt="O3 View"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          <img
            src={PM10Img}
            alt="PM10 View"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          {/* Pollutant Information and Health Recommendations */}
          <div
            className="grid grid-cols-1 gap-4"
            style={{
              position: "relative",
              zIndex: 20,
              padding: "20px",
              pointerEvents: "auto",
            }}
          >
            {airQualityData.pollutants &&
              airQualityData.pollutants.map((pollutant) => (
                <div
                  key={pollutant.code}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-bold text-black">
                    {pollutant.displayName} ({pollutant.fullName})
                  </h4>
                  <p className="text-sm text-gray-800">
                    Concentration: {pollutant.concentration.value}{" "}
                    {pollutant.concentration.units}
                  </p>
                  <p className="text-sm text-gray-800">
                    Sources: {pollutant.additionalInfo.sources}
                  </p>
                  <p className="text-sm text-gray-800">
                    Effects: {pollutant.additionalInfo.effects}
                  </p>
                </div>
              ))}

            {airQualityData.healthRecommendations && (
              <div className="p-4 bg-blue-100 rounded-lg shadow-md mt-4">
                <h4 className="text-xl font-bold text-blue-800">
                  Health Recommendations:
                </h4>
                <p className="text-sm text-blue-700">
                  General Population:{" "}
                  {airQualityData.healthRecommendations.generalPopulation}
                </p>
                <p className="text-sm text-blue-700">
                  Elderly: {airQualityData.healthRecommendations.elderly}
                </p>
                <p className="text-sm text-blue-700">
                  People with Lung Disease:{" "}
                  {airQualityData.healthRecommendations.lungDiseasePopulation}
                </p>
              </div>
            )}

            <div className="p-4 bg-white rounded-lg shadow-md mt-4">
              <p className="text-sm text-gray-800">
                Data retrieved on:{" "}
                {new Date(airQualityData.dateTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-800">
                Region Code: {airQualityData.regionCode.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>Loading map...</div>
  );
};

export default React.memo(TestGoogleMaps);
