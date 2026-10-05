"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  Fuel,
  LocateFixed,
  MapPin,
  PenLine,
  Wallet,
} from "lucide-react";
import WalletPopup from "@/components/user/wallet/WalletPopUp";
import SuccessAnimation from "@/components/web/SuccessAnimation";
import { Button } from "@/components/ui/button";

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
      <SuccessAnimation link={"/user/order/receipt"} time={2500}>
        <div className="flex flex-col items-center justify-center gap-4 text-white">
          <h3 className="text-3xl">Payment Successful</h3>
          <p>Your order is on its way</p>
        </div>
      </SuccessAnimation>
    );
  }
  return (
    <>
      <div className=" flex h-100 w-full flex-col rounded-2xl border border-gray-100 bg-neutral-400 p-2 md:h-120 md:w-125 md:p-8 lg:w-140 2xl:min-h-140">
        {/* header */}
        <div className="space-y-2  mb-5">
          <h2 className="text-sm md:text-base font-medium lg:text-xl">
            Review your order
          </h2>
          <p className="text-grey-800 text-sm lg:text-base font-normal">
            Check everything looks right before you pay.
          </p>
        </div>

        <div className="p-3 md:px-6 md:py-4 border border-gray-200  rounded-lg shadow-sm mb-4">
          <div className="mb-4 flex items-center gap-4">
            <Fuel size={20} className="text-primary hidden md:block" />

            <div className="">
              <div className="">
                <div className="flex items-center gap-1">
                  <h5 className="text-xl md:text-2xl font-semibold uppercase">
                    20l
                  </h5>
                  <span className="flex items-center gap-px">
                    <span className="size-1 rounded-full bg-grey-800"></span>
                    <Badge
                      className={"text-accent text-sm md:text-base"}
                      variant={"ghost"}
                    >
                      Diesel
                    </Badge>
                  </span>
                  <span className="flex items-center gap-px">
                    <span className="size-1 rounded-full bg-grey-800"></span>
                    <Badge
                      className={"text-grey-800 text-sm md:text-base"}
                      variant={"outline"}
                    >
                      One-time
                    </Badge>
                  </span>
                </div>
                <div className="flex items-center gap-1 ">
                  <h5 className="text-green-500 text-xs md:text-sm font-medium">
                    988/ltr
                  </h5>
                  <span className="flex items-center gap-px ">
                    <span className="size-1 rounded-full bg-grey-800"></span>
                    <Badge
                      className={"text-grey-800 text-sm md:text-base"}
                      variant={"ghost"}
                    >
                      Total Energies
                    </Badge>
                  </span>
                </div>
              </div>
            </div>
            <PenLine
              size={20}
              className="text-primary cursor-pointer ml-auto"
            />
          </div>

          <div className="flex flex-col gap-1 md:flex-row justify-between md:items-center">
            <div className="flex gap-2 max-sm:items-center">
              <MapPin size={18} className="text-neutra-1000" />
              <div className="gap-1 max-sm:items-center flex md:flex-col">
                <h5 className="text-xs text-grey-800">Deliver to</h5>
                <p className="text-sm font-medium">13 Ikoyi Street</p>
              </div>
            </div>

            <div className="flex gap-2 max-sm:items-center">
              <div className="gap-1 max-sm:items-center flex md:flex-col">
                <h5 className="text-xs text-grey-800">Est. Delivery Period</h5>
                <p className="text-sm font-medium">1 hr 30min.</p>
              </div>
              <Clock size={18} className="text-neutra-1000 max-sm:-order-1" />
            </div>
          </div>
        </div>

        <div className=" border border-gray-200  rounded-lg shadow-sm">
          <div className="md:px-6 md:py-4 p-3">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <small className="text-xs text-grey-800">
                Petrol · 10L @ ₦980/L
              </small>
              <p className="text-xs font-medium md:text-sm">₦19,600</p>
            </div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <small className="text-xs text-grey-800">Delivery fee</small>
              <p className="text-xs font-medium md:text-sm">₦2,500</p>
            </div>
            <div className="flex items-center justify-between mb-3 ">
              <small className="text-xs text-grey-800">Service charge</small>
              <p className="text-xs font-medium md:text-sm">₦50</p>
            </div>
          </div>
          {/* total */}
          <div className="border-dotted border-t h-1 border-gray-400"></div>
          <div className="px-6 flex items-center justify-between mb-3 md:mb-6">
            <p className="text-sm font-medium text-grey-800">Service charge</p>
            <p className="text-sm font-semibold">₦22,150</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2">
              <Wallet size={14} />
              <h5 className="text-xs text-grey-800 font-medium md:text-sm">
                Wallet Balance
              </h5>
            </span>

            <h5 className="text-xs font-semibold md:text-sm">₦45,350</h5>
          </div>

          <div className="flex items-center gap-1 mt-auto!">
            <Button
              variant={"outline"}
              size={"full"}
              className={
                "text-primary border-primary outline-primary max-sm:p-2 basis-1/2"
              }
              type="button"
              onClick={() => back()}
            >
              Back
            </Button>

            <WalletPopup OnPay={() => setIsSuccessful(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
