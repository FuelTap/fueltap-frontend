import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Fuel, MapPin } from "lucide-react";
import DownloadReceiptButton from "@/components/user/order/DownloadReceiptButton";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Receipt",
};

export default function ReceiptPage() {
  return (
    <div
      className=" flex h-100 w-full items-center flex-col rounded-2xl border border-gray-100 bg-neutral-400 p-2 md:h-120 md:w-125 md:p-8 lg:w-140 2xl:min-h-140
    "
    >
      <Image
        width={184}
        height={184}
        alt="success image"
        src={"/assets/others/success.png"}
      />
      <h1 className="text-3xl text-center font-semibold mb-6">
        Payment Successful
      </h1>

      <div className=" border border-gray-200  rounded-lg shadow-sm mb-6 w-full">
        <div className="p-3 md:px-6 md:py-4">
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

        <div className="border-dotted border-t my-2 h-1 border-gray-400"></div>

        <div className="p-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <small className="text-xs text-grey-800">OrderID</small>
            <p className="text-xs font-medium md:text-sm">#849472</p>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-xs text-grey-800">Estimated arival</small>
            <p className="text-xs font-medium md:text-sm">Today, 10:40AM</p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-2">
        <Button size={"full"} className={"w-full"}>
          Okay
        </Button>

        <DownloadReceiptButton />
      </div>
    </div>
  );
}
