import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [address, setAddress] = useState('');
  const [mapPosition, setMapPosition] = useState([0, 0]);

  return (
    <OrderContext.Provider
      value={{ address, setAddress, mapPosition, setMapPosition }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
