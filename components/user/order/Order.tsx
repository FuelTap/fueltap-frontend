"use client";
import { OrderType, useOrder } from "@/context/OrderProvider";
import { useRouter } from "next/navigation";
import { UserRound, UsersRound, Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const orderOptions = [
  {
    icon: <UserRound size={18} />,
    label: "for you",
    key: "personal",
  },
  {
    icon: <UsersRound />,
    label: "for a friend",
    key: "others",
  },
];
const Order = () => {
  const { orderType, setOrderType } = useOrder();

  const { push, back } = useRouter();
  return (
    <div className="w-screen bg-neutral-400 border border-gray-100 p-5 max-sm:h-[50dvh] md:w-125 rounded-2xl lg:w-140 md:p-8 ">
      <div className="space-y-2 mb-4">
        <h2 className="text-sm md:text-base font-medium lg:text-xl">
          Who are you ordering for?
        </h2>
        <p className="text-grey-800 text-sm lg:text-base font-normal">
          Choose who will receive this delivery.
        </p>
      </div>

      <div className="mb-4 flex items-center h-36.75 md:h-52.25 lg:h-60 gap-4">
        {orderOptions.map(({ key, label, icon }) => (
          <button
            className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-grey-200 p-3  ${orderType === key ? "border-primary-400 text-primary-400 bg-linear-to-br from-[#DDDEFC] to-[#E7F8F2]" : "bg-transparent text-black border-0"} hover:border-primary-400 hover:text-primary-400 hover:bg-linear-to-br hover:from-[#DDDEFC] hover:to-[#E7F8F2] transition-all duration-150 ease-in-out`}
            key={key}
            onClick={() => setOrderType(key as OrderType)}
          >
            <span className="size-12.5 rounded-full flex items-center justify-center bg-linear-to-br from-[#D7DBFA] to-white border border-gray-100 text-primary!">
              {icon}
            </span>
            <span className="text-base  font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
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
          onClick={() => push("/user/order/location")}
          type="button"
          disabled={!orderType}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Order;
