import PriceDisplay from "@/components/user/prices/PriceDisplay";
import { getFuelPrices } from "@/lib/server/prices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price Display",
  description: "Compare fuel prices from multiple suppliers",
};

export default async function PricesPage() {
  const initialResult = await getFuelPrices();

  return (
    <section>
      <h1 className="text-2xl font-medium text-blue-600 md:text-4xl lg:text-[40px]">
        Price Display
      </h1>
      <p className="text-grey-800 mt-2 text-sm md:text-lg">
        Compare prices from multiple suppliers
      </p>

      <PriceDisplay initialResult={initialResult} />
    </section>
  );
}
