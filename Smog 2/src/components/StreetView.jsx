import React, { useRef, useState, useEffect } from 'react';
import reactImg from '../assets/investment-calculator-logo.png';

const initialCenter = {
  lat: 43.664,
  lng: -79.389
};

const StreetView = ({ map, position }) => {
  const streetViewRef = useRef(null);
  const [streetViewPanorama, setStreetViewPanorama] = useState(null);

  useEffect(() => {
    if (map && streetViewRef.current && window.google && window.google.maps) {
      const panorama = new window.google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position,
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
        }
      );

      map.setStreetView(panorama);
      setStreetViewPanorama(panorama);

      const imgElement = document.createElement('img');
      imgElement.src = reactImg;
      imgElement.alt = 'Overlay';
      imgElement.style.width = '100%';
      imgElement.style.height = '100%';
      imgElement.style.opacity = '0.5';
      imgElement.style.position = 'absolute';
      imgElement.style.top = '0';
      imgElement.style.left = '0';
      imgElement.style.zIndex = '1'; // Ensure the image is on top
      imgElement.style.pointerEvents = 'none'; // Allow click-through

      streetViewRef.current.style.position = 'relative';
      streetViewRef.current.appendChild(imgElement);
    }
  }, [map, position]);

  return <div ref={streetViewRef} style={{ width: '800px', height: '600px' }} />;
};

export default StreetView;
