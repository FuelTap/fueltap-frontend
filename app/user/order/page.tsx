import Order from "@/components/user/order/Order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order",
  description: "Order for fuel anywhere",
};

export default function OrderPage() {
  return <Order />;
}
