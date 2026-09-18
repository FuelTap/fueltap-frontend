import ActiveOrderDashboard from "./ActiveOrderDashboard";
import UpComingOrder from "./UpComingOrder";

const DashboardOptionsSection = () => {
  return (
    <div className="md:basis-1/2 lg:basis-[42%] space-y-5">
      <h3 className="text-base font-semibold md:text-xl mb-2">Active Orders</h3>

      <ActiveOrderDashboard />

      <h3 className="text-base font-semibold md:text-xl mb-2">
        Upcoming Orders
      </h3>

      <UpComingOrder />
    </div>
  );
};

export default DashboardOptionsSection;
