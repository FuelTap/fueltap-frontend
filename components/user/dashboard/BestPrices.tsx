import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Plus } from "@/components/animate-ui/icons/plus";
import { formatCurrency } from "@/lib/helpers/help";
import Image from "next/image";
import Link from "next/link";

const BestPrices = () => {
  return (
    <div className="bg-white w-full h-34.5 rounded-2xl border flex flex-col justify-center border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Image
            src={"/assets/user/total.png"}
            height={40}
            width={40}
            alt="fuel station logo"
          />

          <div className="space-y-0.5 flex flex-col">
            <h5 className="text-black font-semibold text-xs lg:text-sm">
              {" "}
              Total
            </h5>
            <small className="font-medium text-yellow-600 text-xs">
              Petrol
            </small>
            <small className="text-xs font-normal text-grey-800">
              VI, Lagos
            </small>
          </div>
        </div>

        <div className=" flex flex-col ">
          <h4 className="font-semibold text-xl">{formatCurrency(995)}</h4>
          <small className="text-xs text-grey-800 text-right">per litre</small>
        </div>
      </div>
      <div className="mt-4">
        <AnimateIcon animateOnHover={true}>
          <Link
            href={"/order"}
            className="text-xs  gap-2 w-full flex items-center justify-center  rounded-[999px] p-2 text-primary bg-neutra-500"
          >
            <Plus size={14} />
            <span>Order Fuel Now</span>
          </Link>
        </AnimateIcon>
      </div>
    </div>
  );
};

export default BestPrices;
