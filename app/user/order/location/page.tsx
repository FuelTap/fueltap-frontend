import OrderLocation from "@/components/user/order/OrderLocation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose your delivery location",
};

export default function OrderLocationPage() {
  return <OrderLocation />;
}
