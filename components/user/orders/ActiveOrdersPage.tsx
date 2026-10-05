import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Plus } from "@/components/animate-ui/icons/plus";
import Image from "next/image";
import Link from "next/link";

const ActiveOrdersPage = () => {
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

        <h2 className="text-base lg:text-lg font-medium">No active orders</h2>
        <p className="max-w-82 md:max-w-111 lg:max-w-140 text-grey-800 leading-5 lg:text-base text-sm ">
          You don't have any fuel deliveries in progress.
          <br className="lg:hidden" /> Place an order and you'll be
          <br className="hidden lg:block" /> able to track it here from
          preparation to delivery.
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

export default ActiveOrdersPage;
