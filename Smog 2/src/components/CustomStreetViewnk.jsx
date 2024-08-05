import React, { useEffect, useRef } from 'react';

const CustomStreetViewPanorama = ({ map, options, onLoad, onVisibleChanged, isLoaded }) => {
  const panoramaRef = useRef(null);
  const panoramaInstanceRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const defaultOptions = {
      position: { lat: 37.869260, lng: -122.254811 },
      visible: true,
      zoom: 1
    };
    const mergedOptions = { ...defaultOptions, ...options };

    panoramaInstanceRef.current = new window.google.maps.StreetViewPanorama(panoramaRef.current, mergedOptions);

    if (onLoad) {
      onLoad(panoramaInstanceRef.current);
    }

    if (onVisibleChanged) {
      panoramaInstanceRef.current.addListener('visible_changed', () => {
        onVisibleChanged(panoramaInstanceRef.current.getVisible());
      });
    }

    return () => {
      window.google.maps.event.clearInstanceListeners(panoramaInstanceRef.current);
    };
  }, [isLoaded, options, onLoad, onVisibleChanged]);

  useEffect(() => {
    if (map && panoramaInstanceRef.current) {
      map.setStreetView(panoramaInstanceRef.current);
    }
  }, [map, isLoaded]);

  return <div ref={panoramaRef} style={{ width: '100%', height: '500px' }} />;
};

export default CustomStreetViewPanorama;
