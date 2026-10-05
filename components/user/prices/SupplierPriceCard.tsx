import { buttonVariants, Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helpers/help";
import type { SupplierPrice } from "@/lib/server/prices";
import { cn } from "@/lib/utils";
import { CircleAlert, Plus, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const timestampFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  // Fixed zone so the server render and the browser render match.
  timeZone: "Africa/Lagos",
});

// "24 Sep at 1:15pm"
function formatLastUpdated(iso: string) {
  const parts = Object.fromEntries(
    timestampFormat.formatToParts(new Date(iso)).map((p) => [p.type, p.value]),
  );
  return `${parts.day} ${parts.month} at ${parts.hour}:${parts.minute}${parts.dayPeriod?.toLowerCase()}`;
}

const cardClassName =
  "relative flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-4 shadow-xs";

interface Props {
  supplier: SupplierPrice;
  isBestPrice?: boolean;
  isRefreshing?: boolean;
  onRefresh: (id: string) => void;
}

const SupplierPriceCard = ({
  supplier,
  isBestPrice = false,
  isRefreshing = false,
  onRefresh,
}: Props) => {
  if (supplier.status === "error") {
    return (
      <article className={cn(cardClassName, "justify-between gap-8 px-6")}>
        <div>
          <h3 className="text-error mb-2 flex items-center gap-2 text-lg font-medium md:text-xl">
            <CircleAlert className="size-6 shrink-0" />
            Unable to load “{supplier.supplierName}” data.
          </h3>
          <p className="text-grey-800 text-base">
            We couldn&apos;t retrieve the latest price. Please hit the Refresh
            button to try again.
          </p>
        </div>

        <Button
          variant="outline"
          className="border-primary-500 text-primary-500 hover:text-primary-500 h-12 w-fit gap-2 rounded-full px-5 text-base"
          disabled={isRefreshing}
          onClick={() => onRefresh(supplier.id)}
        >
          <RefreshCw className={cn("size-4", isRefreshing && "animate-spin")} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </article>
    );
  }

  return (
    <article className={cn(cardClassName, isBestPrice && "rounded-tr-none")}>
      {isBestPrice && (
        <span className="absolute -top-7 right-[-1px] flex h-7 items-center rounded-t-lg bg-green-500 px-2 text-sm font-medium text-white">
          Best Price
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <SupplierLogo
            name={supplier.supplierName}
            logoUrl={supplier.logoUrl}
          />
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3 className="truncate text-lg font-medium text-black md:text-xl">
              {supplier.supplierName}
            </h3>
            <span className="text-sm text-yellow-600">
              {supplier.fuelType}
            </span>
            <span className="text-grey-800 text-sm">{supplier.location}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="text-2xl font-medium text-green-400 md:text-3xl">
            {formatCurrency(supplier.pricePerLitre, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-grey-800 text-sm">per litre</span>
        </div>
      </div>

      <dl className="mt-6 mb-8 space-y-1 text-base">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-grey-800">Delivery Time</dt>
          <dd className="text-black">{supplier.deliveryTime}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-grey-800">Last updated</dt>
          <dd className="text-black">
            {formatLastUpdated(supplier.lastUpdated)}
          </dd>
        </div>
      </dl>

      <Link
        href="/user/order"
        className={cn(
          buttonVariants({ size: "full" }),
          "bg-primary-500 hover:bg-primary-500/90 mt-auto h-12 gap-3 rounded-full text-white",
        )}
      >
        <Plus className="size-5" />
        Order Fuel Now
      </Link>
    </article>
  );
};

function SupplierLogo({
  name,
  logoUrl,
}: {
  name: string;
  logoUrl: string | null;
}) {
  return (
    <span className="border-neutra-500 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white p-1.5">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={`${name} logo`}
          width={52}
          height={52}
          className="object-contain"
        />
      ) : (
        <span className="text-primary-500 truncate text-xs font-bold">
          {name.split(" ")[0]}
        </span>
      )}
    </span>
  );
}

export default SupplierPriceCard;
