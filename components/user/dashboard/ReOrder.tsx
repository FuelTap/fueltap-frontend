import { buttonVariants } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helpers/help";
import Link from "next/link";

const ReOrder = () => {
  return (
    <div className="bg-neutra-400 py-5 px-4  border border-grey-200 rounded-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4 mb-5">
        <ul className="space-y-1.5">
          <li>
            <span className="text-sm lg:text-base text-black font-medium">
              Total Energies, Ikoyi
            </span>
          </li>
          {/* break */}
          <li>
            <span className="text-sm lg:text-base text-black font-medium">
              <span className="text-base lg:text-lg">20L </span>
              <span className="text-accent text-sm">Diesel</span>
              <span className="size-5 rounded-full bg-black"></span>
              <span className="text-green-600"> {formatCurrency(22000)}</span>
            </span>
          </li>
        </ul>
      </div>

      <Link
        href={"/"}
        className={` rounded-[999px] p-4 h-10 font-semibold bg-neutral-400 text-xs border-secondary border! text-secondary flex items-center justify-center gap-2 }`}
      >
        Reorder
      </Link>
    </div>
  );
};

export default ReOrder;
