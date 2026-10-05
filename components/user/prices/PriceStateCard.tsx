import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info, ListFilter, RefreshCw, Search, Wifi } from "lucide-react";

export type PriceState =
  | "no-results"
  | "network"
  | "no-suppliers"
  | "unavailable"
  | "update-failed";

const states: Record<
  PriceState,
  {
    icon: React.ReactNode;
    iconClassName: string;
    title: string;
    text: string;
    actionText: string;
  }
> = {
  "no-results": {
    icon: <ListFilter />,
    iconClassName: "bg-primary-50 text-primary-400",
    title: "No Results Found",
    text: "No suppliers match your current filters. Try adjusting your filter criteria to see more options.",
    actionText: "Clear Filters",
  },
  network: {
    icon: <Wifi />,
    iconClassName: "bg-red-100 text-error",
    title: "Unable to Load Prices",
    text: "We couldn't fetch the latest fuel prices. Please check your internet connection and try again.",
    actionText: "Retry",
  },
  "no-suppliers": {
    icon: <Search />,
    iconClassName: "bg-neutra-500 text-grey-800",
    title: "No Supplier Available",
    text: "There are currently no fuel suppliers servicing your area. Please try a different location or check back later.",
    actionText: "Change Location",
  },
  unavailable: {
    icon: <Info />,
    iconClassName: "bg-red-100 text-error",
    title: "Service Temporarily Unavailable",
    text: "Our price comparison service is currently undergoing maintenance. We'll be back shortly.",
    actionText: "Refresh Page",
  },
  "update-failed": {
    icon: <RefreshCw />,
    iconClassName: "bg-red-100 text-error",
    title: "Update Failed",
    text: "We couldn't refresh the price information. Please try again in a moment.",
    actionText: "Try Again",
  },
};

interface Props {
  state: PriceState;
  onAction: () => void;
  isPending?: boolean;
}

const PriceStateCard = ({ state, onAction, isPending = false }: Props) => {
  const { icon, iconClassName, title, text, actionText } = states[state];

  return (
    <div
      role={state === "no-results" ? "status" : "alert"}
      className="mx-auto mt-10 flex w-full max-w-111 flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center md:mt-20"
    >
      <span
        className={cn(
          "mb-4 flex size-18 items-center justify-center rounded-full [&_svg]:size-8",
          iconClassName,
        )}
      >
        {icon}
      </span>
      <h2 className="mb-2 text-xl font-medium text-black md:text-2xl">
        {title}
      </h2>
      <p className="text-grey-800 mb-8 text-base leading-snug md:text-lg">
        {text}
      </p>
      <Button
        size="full"
        className="bg-primary-500 hover:bg-primary-500/90 h-12 rounded-full text-white"
        onClick={onAction}
        disabled={isPending}
      >
        {actionText}
      </Button>
    </div>
  );
};

export default PriceStateCard;
