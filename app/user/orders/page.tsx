import Orders from "@/components/user/orders/Orders";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "orders",
  description: "view all previous or upcoming orders ",
};
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Orders />
    </Suspense>
  );
}
