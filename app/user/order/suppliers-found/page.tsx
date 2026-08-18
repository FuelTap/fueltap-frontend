import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { ChevronLeft, Fuel, LocateFixed } from "lucide-react";
import Link from "next/link";
export const metadata: Metadata = {
  title: "suppliers found",
};

export default function SuppliersFoundPage() {
  return (
    <div className="relative h-[80dvh] w-screen px-3 py-6 md:min-h-[85dvh] md:w-100 md:p-6 lg:w-154 lg:px-8 lg:py-12">
      {/* header */}
      <div className="mb-3 flex items-center gap-4 py-3">
        <Link href="/order/step-2">
          <ChevronLeft className="cursor-pointer text-2xl" />
        </Link>
        <h4 className="text-2xl font-semibold md:text-[28px] lg:text-4xl">
          <span className="text-primary-400">3</span> suppliers found
        </h4>
      </div>
      <div className="mb-2 flex items-center justify-between py-3">
        <h4 className="title">5b ikoyi street</h4>
        <LocateFixed className="text-2xl text-yellow-700" />
      </div>

      {/* suppliers */}
      <div className="mb-7 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border-[0.5px] p-1"
          >
            <div className="flex items-center gap-4">
              <Fuel size={22} className="text-black/80" />
              <div className="flex flex-col gap-1">
                <h5 className="text-xl-regular font-medium!">Total Energies</h5>
                <small className="text-lg-regular text-neutra-800">
                  Lorem ipsum sjs
                </small>
              </div>
            </div>
            <h5 className="text-xl-regular font-medium! text-green-500">
              980/ltr
            </h5>
          </div>
        ))}
      </div>
      <div className="max-sm:absolute! max-sm:bottom-4 max-sm:left-1/2 max-sm:w-[95%] max-sm:-translate-x-1/2">
        <Link href="/user/order/summary">
          <Button size={"full"}>Next</Button>
        </Link>
      </div>
    </div>
  );
}
