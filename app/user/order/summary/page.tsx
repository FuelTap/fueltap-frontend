"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Fuel, LocateFixed } from "lucide-react";
import WalletPopup from "@/components/user/wallet/WalletPopUp";
import SuccessAnimation from "@/components/web/SuccessAnimation";

const OrderSummary = () => {
  const { back } = useRouter();
  // static values (replace with real data when available)
  const petrolPrice = 980; // per liter
  const deliveryFee = 2500;
  const otherCharges = 50;
  const amountLiters = 10; // 10L

  const petrolTotal = petrolPrice * amountLiters;
  const grandTotal = petrolTotal + deliveryFee + otherCharges;

  const fmt = (n: any) => "₦" + n.toLocaleString();

  const [isSuccessful, setIsSuccessful] = useState(false);

  if (isSuccessful) {
    return (
      <SuccessAnimation link={"/user/dashboard"} time={5500}>
        <div className="flex flex-col items-center justify-center gap-4 text-white">
          <h3 className="text-3xl">Payment Successful</h3>
          <p>Your order is on its way</p>
        </div>
      </SuccessAnimation>
    );
  }
  return (
    <>
      <div className="relative h-[80dvh] max-h-188.75 w-screen overflow-hidden px-3 py-6 hover:overflow-y-scroll md:w-[400px] md:p-6 lg:w-[616px] lg:px-8 lg:py-12">
        {/* header */}
        <div className="mb-3 flex items-center gap-4 py-3">
          <ChevronLeft
            className="cursor-pointer text-2xl"
            onClick={() => back()}
          />
          <h4 className="text-2xl font-semibold md:text-[28px] lg:text-4xl">
            Order Summary
          </h4>
        </div>
        {/* badges */}
        <div className="text mb-4 space-x-2.5">
          <Badge className={"text-white"} variant={"accent"}>
            One-Time
          </Badge>
          <Badge className={"text-white"} variant={"accent"}>
            Petrol
          </Badge>
          <Badge className={"text-white"} variant={"accent"}>
            10L
          </Badge>
        </div>
        <div className="mb-6 flex items-center justify-between py-3">
          <h4 className="title font-medium!">5b ikoyi street</h4>
          <LocateFixed className="text-2xl text-yellow-700" />
        </div>
        <div className="mb-6 flex items-center justify-between py-3">
          <h4 className="title font-medium!">Total Energies</h4>
          <Fuel className="text-2xl text-yellow-700" />
        </div>

        {/* summary */}
        <div className="mt-4 overflow-auto">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="text-primary text-left">
                <th className="py-2">Item</th>
                <th className="py-2">Price</th>
                <th className="py-2">Amount</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-neutra-1000">
              <tr className="border-t">
                <td className="py-3">Petrol</td>
                <td className="py-3">{`₦${petrolPrice.toLocaleString()}/ltr`}</td>
                <td className="py-3">{amountLiters}L</td>
                <td className="py-3 text-right font-medium">
                  {fmt(petrolTotal)}
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Delivery</td>
                <td className="py-3">{fmt(deliveryFee)}</td>
                <td className="py-3">-</td>
                <td className="py-3 text-right">{fmt(deliveryFee)}</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Charges</td>
                <td className="py-3">{fmt(otherCharges)}</td>
                <td className="py-3">-</td>
                <td className="py-3 text-right">{fmt(otherCharges)}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 mb-2 flex items-center justify-between rounded-[8px] border-[0.5px] p-2 shadow-lg">
            <span className="text-lg font-medium">Sum Total</span>
            <span className="text-lg font-semibold text-green-500">
              {fmt(grandTotal)}
            </span>
          </div>
        </div>

        <WalletPopup OnPay={() => setIsSuccessful(true)} />
      </div>
    </>
  );
};

export default OrderSummary;
