import { Input } from '@/components/ui/input';
import { GoClock } from 'react-icons/go';
import { useNavigate, useSearchParams } from 'react-router';

import { FaSearch } from 'react-icons/fa';
import { orderOptions } from '@/components/Imports';
import SearchAddressInput from '@/components/ui/SearchAddress';
import { useOrder } from '@/contexts/OrderContext';

const Order = () => {
  const {
    selectedAddress,
    setSelectedAddress,
    orderType,
    setSearchParams,
    searchParams,
  } = useOrder();

  const navigate = useNavigate();
  return (
    <div className="w-screen px-3 py-6 max-sm:h-[50dvh] md:w-[400px] md:p-6 lg:w-[478px] lg:px-8 lg:py-12">
      <h2 className="mb-4 text-xl">Ready for a refil?</h2>

      <div className="mb-4 flex items-center">
        {orderOptions.map(({ key, label, icon }) => (
          <button
            className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-3 text-lg ${orderType === key ? 'border-primary-400 text-primary-400' : ''}`}
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
        <SearchAddressInput />
        <FaSearch className="text-grey-600 absolute top-1/2 right-0 -translate-1/2" />
      </div>
      <div
        className="mt-4 flex items-center gap-3"
        onClick={() => {
          setSelectedAddress((prev) => ({
            ...prev,
            display_name: '15 ikoyi street',
          }));
          navigate('/order/step-2');
        }}
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
