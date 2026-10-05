import { ReactNode } from "react";
import { OrderProvider } from "@/context/OrderProvider";

import OrderMap from "@/components/user/order/OrderMap";

export default function OrderLayout({
  children,
  drawer,
}: {
  children: ReactNode;
  drawer: ReactNode;
}) {
  return (
    <OrderProvider>
      <div className="relative h-dvh overflow-hidden">
        {/* <OrderMap /> */}

        <div className="flex items-center justify-center">{children}</div>
        {drawer}
      </div>
    </OrderProvider>
  );
}
