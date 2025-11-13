import { Input } from '@/components/ui/input';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { HiMiniUsers } from 'react-icons/hi2';
import { GoClock } from 'react-icons/go';
import { Navigate, useSearchParams } from 'react-router';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch } from 'react-icons/fa';
const orderOptions = [
  {
    icon: <MdOutlinePersonOutline size={18} />,
    label: 'for you',
    key: 'personal',
  },
  {
    icon: <HiMiniUsers />,
    label: 'for a friend',
    key: 'others',
  },
];

const Order = () => {
  const { isLoading, position, error, getPosition } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([0, 0]);

  useEffect(() => {
    getPosition();
    if (position) {
      setMapPosition([position.lat, position.lng]);
    }
  }, [position, getPosition]);

  const [searchParams, setSearchParams] = useSearchParams();

  const orderType = searchParams.get('orderType');

  const [address, setAddress] = useState('');
  function handleAddressChange(e) {
    setAddress(e.target.value);
  }
  useEffect(() => {
    if (orderType) {
      // alert('hi');
      // <Navigate to={'/users'} replace />;
    }
  }, [orderType]);

  return (
    <div className="relative h-dvh overflow-hidden">
      <MapContainer center={mapPosition} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="absolute top-1/2 left-1/2 z-1000 w-[400px] -translate-1/2 rounded-2xl bg-white">
        <div className="p-6">
          <h2 className="mb-4 text-xl">Ready for a refil?</h2>

          <div className="mb-4 flex">
            {orderOptions.map(({ key, label, icon }) => (
              <button
                className={`flex w-full max-w-[170px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg p-3 text-lg ${orderType === key ? 'border-primary-400 text-primary-400 border' : ''}`}
                key={key}
                onClick={() => {
                  searchParams.set('orderType', key);
                  setSearchParams(searchParams);
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Input
              placeholder="Enter delivery address"
              value={address}
              onChange={handleAddressChange}
            />
            <FaSearch className="text-grey-600 absolute top-1/2 right-0 -translate-1/2" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <GoClock />
            <div>
              <h5 className="mb-1">5b Ikoyi Road</h5>
              <small className="text-neutra-900 text-sm">Ikoyi, Nigeria</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
