import React, { useEffect, useRef } from 'react';

const StreetView = ({ map, options, onLoad, onVisibleChanged }) => {
  const streetViewRef = useRef(null);

  useEffect(() => {
    if (map) {
      const panorama = new google.maps.StreetViewPanorama(
        streetViewRef.current,
        options
      );

      map.setStreetView(panorama);

      google.maps.event.addListener(panorama, 'visible_changed', () => {
        const isVisible = panorama.getVisible();
        onVisibleChanged(isVisible);
      });

      if (onLoad) {
        onLoad(panorama);
      }
    }
  }, [map, options, onLoad, onVisibleChanged]);

  return <div ref={streetViewRef} style={{ display: 'none' }} />;
};

export default React.memo(StreetView);
