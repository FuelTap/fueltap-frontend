import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [mapPosition, setMapPosition] = useState([0, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  const orderType = searchParams.get('orderType') || 'personal';

  return (
    <OrderContext.Provider
      value={{
        selectedAddress,
        setSelectedAddress,
        mapPosition,
        setMapPosition,
        orderType,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
