import { useState, useEffect } from 'react';

const useAirQuality = (position) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    if (position) {
      const { lat, lng } = position;
      const apiKey = import.meta.env.VITE_APP_GOOGLE_AIR_QUALITY_API_KEY;
      const url = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`;

      const body = {
        location: {
          latitude: lat,
          longitude: lng,
        },
        "extraComputations": [
          "HEALTH_RECOMMENDATIONS",
          "DOMINANT_POLLUTANT_CONCENTRATION",
          "POLLUTANT_CONCENTRATION",
          "POLLUTANT_ADDITIONAL_INFO"
        ],
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setAirQualityData(data);
        })
        .catch(error => {
          console.error('Error fetching air quality data:', error);
        });
    }
  }, [position]);

  return airQualityData;
};

export default useAirQuality;
