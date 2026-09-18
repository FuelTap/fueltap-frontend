import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/helpers/help";
import { MapPinHouse } from "lucide-react";
import Link from "next/link";

const UpComingOrder = () => {
  return (
    <div className="bg-neutra-400 py-5 px-4  border border-grey-200 rounded-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4 mb-5">
        <MapPinHouse className="text-black" size={24} />
        <ul className="space-y-1.5">
          <li>
            {" "}
            <span className="text-xs text-grey-800 md:text-sm">Station:</span>
            <span className="text-sm lg:text-base text-black font-medium">
              Total Energies, Ikoyi
            </span>
          </li>
          {/* break */}
          <li>
            <span className="text-xs text-grey-800 lg:text-sm">Amount:</span>
            <span className="text-sm lg:text-base text-black font-medium">
              <span className="text-base lg:text-lg"> 20L</span> Diesel
              <span className="size-5 rounded-full bg-neutra-700"></span>
              <span> {formatCurrency(22000)}</span>
            </span>
          </li>
          {/* break */}
          <li>
            <span className="text-xs text-grey-800 md:text-sm">
              Delivery Address:
            </span>{" "}
            <span className="text-sm lg:text-base text-black font-medium">
              5b Ikoyi Road
            </span>
          </li>
        </ul>
      </div>

      <Badge variant={"accent"}>Scheduled</Badge>
    </div>
  );
};

export default UpComingOrder;
