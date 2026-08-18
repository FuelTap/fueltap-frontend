"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useSearchParamsQuery } from "@/hooks/useSearchParams";

interface OrderContextType {
  selectedAddress: any;
  setSelectedAddress: (address: any) => void;
  mapPosition: [number, number];
  setMapPosition: (position: [number, number]) => void;
  orderType: string;
  setOrderType: (type: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [mapPosition, setMapPosition] = useState<[number, number]>([0, 0]);

  const { handleSearchParams, searchParams } =
    useSearchParamsQuery("orderType");

  const orderType = searchParams.get("orderType") || "personal";

  // Helper function to update search params in Next.js
  const setOrderType = (type: string) => {
    handleSearchParams(type);
  };

  return (
    <OrderContext.Provider
      value={{
        selectedAddress,
        setSelectedAddress,
        mapPosition,
        setMapPosition,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrder must be used within an OrderProvider");
  return context;
}
