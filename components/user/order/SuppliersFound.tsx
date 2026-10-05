"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Fuel, LocateFixed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SuppliersFound({ onBack }: { onBack?: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="relative flex h-100 w-full flex-col rounded-2xl border border-gray-100 bg-neutral-400 p-5 md:h-120 md:w-125 md:p-8 lg:w-140 2xl:min-h-140">
      <div className="mb-3 flex items-center gap-4 py-3 md:mb-6">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to order details"
            className="flex size-7 items-center justify-center rounded-full bg-neutra-500 md:size-10"
          >
            <ChevronLeft size={16} />
          </button>
        ) : (
          <Link
            href="/user/order/step-2"
            aria-label="Back to order details"
            className="flex size-7 items-center justify-center rounded-full bg-neutra-500 md:size-10"
          >
            <ChevronLeft size={16} />
          </Link>
        )}
        <h4 className="text-2xl font-semibold md:text-[28px] lg:text-3xl">
          <span className="text-primary-400">3</span> suppliers found
        </h4>
      </div>
      <div className="mb-2 flex items-center justify-between py-3 md:mb-4">
        <h4 className="text-base font-medium md:text-lg">5b ikoyi street</h4>
        <LocateFixed size={22} className="text-yellow-700" />
      </div>
      <div className="mb-7 space-y-4 overflow-y-auto">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-xl  px-4 py-2 ${selected === i ? "bg-linear-to-r from-[#DDDEFC] to-[#E7F8F2] border-2 border-primary " : "bg-transparent border-[0.5px] border-grey-200"} cursor-pointer hover:bg-linear-to-r from-[#DDDEFC] to-[#E7F8F2]  hover:border-primary transition-all duration-150 ease-in-out`}
            onClick={() => setSelected(i)}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex size-7 items-center justify-center rounded-full ${selected === i ? "bg-white" : "bg-neutral-400"}  md:size-10`}
              >
                <Fuel size={16} className="text-primary" />
              </span>
              <div className="flex flex-col">
                <h5 className="text-sm font-medium md:text-lg">
                  Total Energies
                </h5>
                <small className="text-sm font-normal text-neutra-1000 md:text-base">
                  Lorem ipsum sjs
                </small>
              </div>
            </div>
            <h5 className="text-base font-medium text-green-500 md:text-xl">
              980/ltr
            </h5>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <Link href="/user/order/summary">
          <Button size="full">Next</Button>
        </Link>
      </div>
    </div>
  );
}
