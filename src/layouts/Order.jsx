import { Outlet } from 'react-router';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Order = () => {
  const { isLoading, position, error, getPosition } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([20, 67]);

  //   useEffect(() => {
  //     getPosition();
  //     if (position) {
  //       setMapPosition([position.lat, position.lng]);
  //     }
  //   }, [position, getPosition]);

  return (
    <div className="relative h-dvh overflow-hidden">
      <MapContainer center={mapPosition} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="absolute top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Order;
