import { ReactNode } from "react";
import { OrderProvider } from "@/context/OrderProvider";

import OrderMap from "@/components/user/order/OrderMap";

export default function OrderLayout({ children }: { children: ReactNode }) {
  return (
    <OrderProvider>
      <div className="relative h-dvh overflow-hidden">
        <OrderMap />

        <div className="absolute z-1000 rounded-2xl bg-white max-sm:bottom-0 max-sm:left-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          {children}
        </div>
      </div>
    </OrderProvider>
  );
}
