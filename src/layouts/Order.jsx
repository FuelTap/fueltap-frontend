import { Outlet } from 'react-router';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useOrder } from '@/contexts/OrderContext';
import GeoCoder from '@/components/GeoCoder';

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
        // key={mapPosition.join(',')}
        center={mapPosition}
        zoom={18}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoCoder
          onResult={(coords) => {
            console.log('User selected:', coords);
            setMapPosition([coords.lat, coords.lng]);
          }}
        />
      </MapContainer>
      <div className="absolute z-[1000] rounded-2xl bg-white max-sm:bottom-0 max-sm:left-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <Outlet />
      </div>
    </div>
  );
};

export default Order;
