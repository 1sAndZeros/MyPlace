

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapComponent.css';
import Navbar from '../Navbar/Navbar';

const MapComponent = () => {
  const mapContainer = useRef(null);
  const addMarker = useRef(false);
  const [markerState, setMarkerState] = useState(false);
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaW15cGxhY2UiLCJhIjoiY2xudTViMGp3MGNwYTJsbzVtdnNxZ3NvOCJ9.j49LvpTufygf0Cx9HhldIg';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-111, 32],
      zoom: 1
    });

    map.on('click', (e) => {
      if (addMarker.current) {
        new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map);
        addMarker.current = false; 
        setMarkerState(false); // Update state to force re-render
      }
    });

    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, []);

  const handleClick = () => {
    addMarker.current = true;
    setMarkerState(true); // Update state to force re-render
  };

  return (
    <>
    <Navbar/>
    <div>
      <button className='btn-click'onClick={handleClick}>Add Marker</button>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
    </>
  );
};

export default MapComponent;
