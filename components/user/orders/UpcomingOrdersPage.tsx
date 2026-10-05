import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Plus } from "@/components/animate-ui/icons/plus";
import Image from "next/image";
import Link from "next/link";

const UpcomingOrdersPage = () => {
  return (
    <>
      {/* no active order */}
      <section className="flex flex-col items-center gap-5 text-center">
        <Image
          width={130}
          height={119}
          alt="no order illustration"
          src={"/assets/user/order/noOrder.png"}
        />

        <h2 className="text-base lg:text-lg font-medium">
          No upcoming deliveries
        </h2>
        <p className="max-w-82 md:max-w-111 lg:max-w-140 text-grey-800 leading-5 lg:text-base text-sm ">
          You don't have any scheduled fuel deliveries yet. Schedule your next
          delivery and we'll keep it ready here until it's time. You don't have
          any fuel deliveries in progress.
        </p>

        <AnimateIcon animateOnHover={true}>
          <Link
            href={"/user/order"}
            className="text-xs  md:text-sm gap-2 w-full flex items-center justify-center h-10  rounded-[999px] p-4 text-white bg-primary"
          >
            <Plus size={14} />
            <span>Order Fuel Now</span>
          </Link>
        </AnimateIcon>
      </section>
    </>
  );
};

export default UpcomingOrdersPage;
