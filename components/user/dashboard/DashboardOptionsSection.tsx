import Link from "next/link";
import ActiveOrderDashboard from "./ActiveOrderDashboard";
import BestPrices from "./BestPrices";
import ReOrder from "./ReOrder";
import UpComingOrder from "./UpComingOrder";
import { buttonVariants } from "@/components/ui/button";

const DashboardOptionsSection = () => {
  return (
    <div className="md:basis-1/2 lg:basis-[54%] space-y-5">
      <h3 className="text-base font-medium md:text-xl mb-2">Active Orders</h3>

      <ActiveOrderDashboard />

      {/* best prices */}

      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium md:text-xl mb-2">
          Upcoming Orders
        </h3>

        <Link
          href="/user/"
          className={`${buttonVariants({ variant: "link" })} text-base`}
        >
          View all prices
        </Link>
      </div>

      <div className="flex items-center gap-4 flex-col lg:flex-row">
        {[1, 2].map((_, index) => (
          <BestPrices key={index} />
        ))}
      </div>

      {/* upcoming orders */}

      <h3 className="text-base font-medium md:text-xl mb-2">Upcoming Orders</h3>

      <UpComingOrder />

      <h3 className="text-base font-medium md:text-xl mb-2">
        Reorder your usual
      </h3>

      <ReOrder />
    </div>
  );
};

export default DashboardOptionsSection;
