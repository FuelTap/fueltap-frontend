"use client";

import { useRouter } from "next/navigation";
import { useSearchParamsQuery } from "@/hooks/useSearchParams";
import ActiveOrdersPage from "./ActiveOrdersPage";
import UpcomingOrdersPage from "./UpcomingOrdersPage";
import PastOrdersPage from "./PastOrdersPage";

const Orders = () => {
  const router = useRouter();

  const { handleSearchParams, searchParams } = useSearchParamsQuery("time");

  const active = searchParams.get("time") || "Active";

  console.log(active);
  return (
    <>
      <section className="mb-3 md:mb-5.5">
        <h2 className="mb-1 text-xl font-semibold text-primary md:text-3xl lg:text-4xl">
          Orders
        </h2>
        <p className="font-normal text-gray-800 text-sm md:text-base lg:text-lg">
          Track your upcoming and past orders. Click to see full order
          summaries.
        </p>
      </section>

      <div className="bg-primary-50 min-h-10 flex items-center p-1 rounded-[999px] border-[0.5px] border-primary-100 w-full md:w-94 mb-4 lg:mb-8">
        {[
          {
            text: "Active",
          },
          {
            text: "Upcoming",
          },
          {
            text: "Past",
          },
        ].map(({ text }) => (
          <button
            key={text}
            className={` ${active === text ? " text-primary-500 border-b-2 border-b-primary bg-white" : "border-0 bg-transparent"} text-primary-400 w-1/3 rounded-[999px] transition-all duration-150 ease-in-out py-1 px-2 text-sm md:text-base font-medium  h-8/10 cursor-pointer`}
            onClick={() => {
              handleSearchParams(text);
            }}
          >
            {text}
          </button>
        ))}
      </div>

      <>
        {active === "Active" && <ActiveOrdersPage />}
        {active === "Upcoming" && <UpcomingOrdersPage />}
        {active === "Past" && <PastOrdersPage />}
      </>
    </>
  );
};

export default Orders;
