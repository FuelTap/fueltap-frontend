import Dashboard from "@/components/user/dashboard/Dashboard";
import { getWalletBalance } from "@/lib/server/wallet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const res = await getWalletBalance();

  if (!res.success) {
    throw new Error(res.message);
  }

  return <Dashboard balance={res.data?.balance ?? 0} />;
}
