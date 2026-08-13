import Orders from "@/components/user/orders/Orders";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Orders />
    </Suspense>
  );
}
