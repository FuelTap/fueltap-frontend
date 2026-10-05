import { formatCurrency } from "@/lib/helpers/help";
import { LocateFixed, MapPinHouse } from "lucide-react";
import Link from "next/link";

const ActiveOrderDashboard = () => {
  return (
    <div className="bg-secondary py-5 px-4  border border-grey-200 rounded-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4 mb-5">
        <MapPinHouse className="text-white" size={24} />
        <ul className="space-y-1.5">
          <li>
            {" "}
            <span className="text-xs text-neutral-400 md:text-sm">
              Station:
            </span>
            <span className="text-sm lg:text-base text-white font-medium">
              Total Energies, Ikoyi
            </span>
          </li>
          {/* break */}
          <li>
            <span className="text-xs text-neutral-400 lg:text-sm">Amount:</span>
            <span className="text-sm lg:text-base text-white font-medium">
              <span className="text-base lg:text-lg"> 20L</span> Diesel
              <span className="size-5 rounded-full bg-neutra-700"></span>
              <span> {formatCurrency(22000)}</span>
            </span>
          </li>
          {/* break */}
          <li>
            <span className="text-xs text-neutral-400 md:text-sm">
              Delivery Address:
            </span>{" "}
            <span className="text-sm lg:text-base text-white font-medium">
              5b Ikoyi Road
            </span>
          </li>
        </ul>
      </div>

      <Link
        href={"/"}
        className="rounded-[999px] p-3 h-10 font-semibold bg-neutral-400 tex-xs text-secondary flex items-center justify-center gap-2 group"
      >
        <span>Track Delivery</span>
        <LocateFixed className="transform transition-transform duration-500 ease-in-out group-hover:rotate-180" />
      </Link>
    </div>
  );
};

export default ActiveOrderDashboard;
