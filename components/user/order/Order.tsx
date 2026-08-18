"use client";
import SearchAddressInput from "./SearchAddressInput";
import { useOrder } from "@/context/OrderProvider";
import { useRouter } from "next/navigation";
import { UserRound, UsersRound, Search, Clock } from "lucide-react";

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
  const { selectedAddress, setSelectedAddress, orderType, setOrderType } =
    useOrder();

  const { push } = useRouter();
  return (
    <div className="w-screen px-3 py-6 max-sm:h-[50dvh] md:w-100 md:p-6 lg:w-119.5 lg:px-8 lg:py-12">
      <h2 className="mb-4 text-xl">Ready for a refil?</h2>

      <div className="mb-4 flex items-center">
        {orderOptions.map(({ key, label, icon }) => (
          <button
            className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-3 text-lg ${orderType === key ? "border-primary-400 text-primary-400" : ""}`}
            key={key}
            onClick={() => setOrderType(key)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <SearchAddressInput />
        <Search className="text-grey-600 absolute top-1/2 right-0 -translate-1/2" />
      </div>
      <div
        className="mt-4 flex items-center gap-3"
        onClick={() => {
          setSelectedAddress((prev: any) => ({
            ...prev,
            display_name: "15 ikoyi street",
          }));
          push("/user/order/step-2");
        }}
      >
        <Clock />
        <div>
          <h5 className="mb-1">5b Ikoyi Road</h5>
          <small className="text-neutra-900 text-sm">Ikoyi, Nigeria</small>
        </div>
      </div>
    </div>
  );
};

export default Order;
