"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const ORDER_DRAFT_KEY = "fueltap-order-draft";

export type OrderType = "personal" | "others" | "";

interface SelectedAddress {
  display_name: string;
  lat: string;
  lng: string;
}

interface OrderDraft {
  selectedAddress?: SelectedAddress;
  mapPosition: [number, number];
  orderType: OrderType;
}

interface OrderContextType {
  selectedAddress?: SelectedAddress;
  setSelectedAddress: (address?: SelectedAddress) => void;
  mapPosition: [number, number];
  setMapPosition: (position: [number, number]) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [selectedAddress, setSelectedAddress] = useState<SelectedAddress>();
  const [mapPosition, setMapPosition] = useState<[number, number]>([0, 0]);
  const [orderType, setOrderType] = useState<OrderType>("");
  const [hasLoadedDraft, setHasLoadedDraft] = useState(false);

  useEffect(() => {
    try {
      const savedDraft = sessionStorage.getItem(ORDER_DRAFT_KEY);

      if (savedDraft) {
        const draft = JSON.parse(savedDraft) as Partial<OrderDraft>;

        setSelectedAddress(draft.selectedAddress);
        setMapPosition(draft.mapPosition ?? [0, 0]);
        setOrderType(draft.orderType ?? "");
      }
    } catch (error) {
      console.error("Unable to restore order draft", error);
    } finally {
      setHasLoadedDraft(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedDraft) return;

    const draft: OrderDraft = {
      selectedAddress,
      mapPosition,
      orderType,
    };

    try {
      sessionStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(draft));
    } catch (error) {
      console.error("Unable to save order draft", error);
    }
  }, [hasLoadedDraft, selectedAddress, mapPosition, orderType]);

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
