import { Input } from '@/components/ui/input';
import { GoClock } from 'react-icons/go';
import { Navigate, useNavigate, useSearchParams } from 'react-router';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch } from 'react-icons/fa';
import { orderOptions } from '@/components/Imports';

const Order = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderType = searchParams.get('orderType') || 'personal';

  const [address, setAddress] = useState('');
  function handleAddressChange(e) {
    setAddress(e.target.value);
  }
  const navigate = useNavigate();
  return (
    <div className="w-[400px] p-6">
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
      <div
        className="mt-4 flex items-center gap-3"
        onClick={() =>
          navigate('/order/step-2', { state: { orderType, address } })
        }
      >
        <GoClock />
        <div>
          <h5 className="mb-1">5b Ikoyi Road</h5>
          <small className="text-neutra-900 text-sm">Ikoyi, Nigeria</small>
        </div>
      </div>
    </div>
  );
};

export default Order;
