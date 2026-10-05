import { Metadata } from "next";
import SuppliersFound from "@/components/user/order/SuppliersFound";
export const metadata: Metadata = {
  title: "suppliers found",
};

export default function SuppliersFoundPage() {
  return <SuppliersFound />;
}
