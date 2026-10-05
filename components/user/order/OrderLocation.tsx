"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SearchAddressInput from "./SearchAddressInput";
import { MapPinHouse, Search } from "lucide-react";
import { useOrder } from "@/context/OrderProvider";
import OrderMap from "./OrderMap";

const OrderLocation = () => {
  const { push, back } = useRouter();
  const { selectedAddress } = useOrder();

  console.log("selected address", selectedAddress);

  return (
    <div className="w-screen bg-neutral-400 border border-gray-100 flex flex-col gap-4 p-5 h-100 md:h-120 2xl:min-h-140! md:w-125! rounded-2xl lg:w-140! md:p-8 ">
      <div className="space-y-2  ">
        <h2 className="text-sm md:text-base font-medium lg:text-xl">
          Where should we deliver your fuel?
        </h2>
        <p className="text-grey-800 text-sm lg:text-base font-normal">
          Your address stays private and is only shared with the assigned
          delivery partner once your order is confirmed.
        </p>
      </div>

      <div className="space-y-2 ">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 text-grey-800 -translate-y-1/2" />
          <SearchAddressInput />
        </div>

        <button className="text-primary cursor-pointer flex items-center gap-1">
          <MapPinHouse size={16} />
          <span className="text-xs md:text-sm font-semibold">
            Use my current location
          </span>
        </button>
      </div>

      <div className="h-62.5 border!">
        <OrderMap />
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

        <Button
          className={"max-sm:p-2 basis-1/2"}
          size={"full"}
          onClick={() => push("/user/order")}
          type="button"
          disabled={
            selectedAddress?.display_name === "" ||
            selectedAddress === undefined
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrderLocation;
