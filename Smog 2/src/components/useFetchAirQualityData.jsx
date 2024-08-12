import { useState, useEffect } from 'react';

const useFetchAirQualityData = (position) => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAirQualityData = async (controller) => {
    setIsLoading(true);
    setError(false);
    
    try {
      if (position) {
        const { lat, lng } = position;
        const apiKey = import.meta.env.VITE_APP_GOOGLE_AIR_QUALITY_API_KEY;
        
        if (!apiKey) {
          throw new Error('API key is missing');
        }
        
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

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          signal: controller.signal, 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data) {
          throw new Error('No data received');
        }
        console.log("Setting Air Quality data", data);
        setAirQualityData(data);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Error fetching air quality data:", err);
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    
    getAirQualityData(controller);
    
    return () => {
      controller.abort();
    };
  }, [position]);

  return [airQualityData, isLoading, error];
};

export default useFetchAirQualityData;
