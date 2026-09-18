import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Plus } from "@/components/animate-ui/icons/plus";
import Link from "next/link";

const OrderFuelCard = () => {
  return (
    <div
      className="h-41.25   p-4 rounded-[20px] md:px-7.5 md:py-5 bg-right bg-no-repeat bg-contain flex flex-col justify-between"
      style={{
        backgroundImage: `
          url('/assets/user/fuelPump.png'),
          linear-gradient(to bottom right, #000080, #2E54C0)
        `,
      }}
    >
      <div className="">
        <h5 className="text-white text-sm lg:text-base mb-1">
          Reliable fuel delivery for your everyday needs
        </h5>
        <p className="text-xs text-yellow-600">Fast - Safe - Convenient</p>
      </div>

      <div className="">
        <AnimateIcon animateOnHover={true}>
          <Link
            href={"/order"}
            className="text-xs w-fit gap-2 flex items-center justify-between rounded-[999px] p-2 text-primary bg-neutra-500"
          >
            <Plus size={14} />
            <span>Order Fuel Now</span>
          </Link>
        </AnimateIcon>
      </div>
    </div>
  );
};
export default OrderFuelCard;
