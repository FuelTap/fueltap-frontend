import { Outlet } from 'react-router';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useOrder } from '@/contexts/OrderContext';

const Order = () => {
  const { isLoading, position, error, getPosition } = useGeolocation();
  const { mapPosition, setMapPosition } = useOrder();

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    if (position) {
      console.log(position);
      setMapPosition([position.lat, position.lng]);
    }
  }, [position, setMapPosition]);

  return (
    <div className="relative h-dvh overflow-hidden">
      <MapContainer
        key={mapPosition.join(',')}
        center={mapPosition}
        zoom={14}
        className="h-full w-full"
      >
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
