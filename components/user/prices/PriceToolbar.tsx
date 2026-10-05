"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fuelType as fuelTypes,
  priceSortOptions,
  type PriceSortOrder,
} from "@/lib/data/exports";
import type { FuelType } from "@/lib/server/prices";
import { cn } from "@/lib/utils";
import { RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import PriceFilterDrawer from "./PriceFilterDrawer";

const fuelTypeOptions = fuelTypes.map(({ text }) => ({
  label: text,
  value: text as FuelType,
}));

interface Props {
  search: string;
  onSearchChange: (search: string) => void;
  sort: PriceSortOrder;
  onSortChange: (sort: PriceSortOrder) => void;
  fuelType: FuelType;
  onFuelTypeChange: (fuelType: FuelType) => void;
  syncedAt: string | null;
  isRefreshingAll: boolean;
  onRefreshAll: () => void;
}

const PriceToolbar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  fuelType,
  onFuelTypeChange,
  syncedAt,
  isRefreshingAll,
  onRefreshAll,
}: Props) => {
  return (
    <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:items-center md:gap-3 lg:gap-4">
      {/* Last sync sits above the search on mobile and at the end on larger screens */}
      <div className="flex items-center justify-between gap-1 md:order-last md:flex-col md:items-end">
        <p className="flex items-center gap-2 text-xs">
          <span className="text-grey-800">Last Sync</span>
          <span className="font-medium text-black">
            <TimeAgo iso={syncedAt} />
          </span>
        </p>
        <button
          type="button"
          onClick={onRefreshAll}
          disabled={isRefreshingAll}
          className="text-primary-500 flex cursor-pointer items-center gap-1.5 text-xs font-medium whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-70"
        >
          <RefreshCw
            className={cn("size-3.5", isRefreshingAll && "animate-spin")}
          />
          {isRefreshingAll ? "Refreshing..." : "Refresh all prices"}
        </button>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative min-w-0 flex-1 md:max-w-124">
          <Search className="text-grey-800 pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
          <Input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search fuel stations"
            aria-label="Search fuel stations"
            className="focus-visible:border-primary-400/40! focus-visible:ring-primary-50 placeholder:text-grey-800 h-12! rounded-full! border-gray-100! bg-white! pr-4! pl-12! text-base! text-black! focus-visible:ring-4"
          />
        </div>

        <div className="md:hidden">
          <PriceFilterDrawer
            sort={sort}
            onSortChange={onSortChange}
            fuelType={fuelType}
            onFuelTypeChange={onFuelTypeChange}
          />
        </div>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <FilterSelect
          label="Price"
          options={priceSortOptions}
          value={sort}
          onChange={onSortChange}
        />
        <FilterSelect
          label="Fuel Type"
          options={fuelTypeOptions}
          value={fuelType}
          onChange={onFuelTypeChange}
        />
      </div>
    </div>
  );
};

// Pill with a fixed label on the left and the select on the right.
function FilterSelect<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex h-12 items-center rounded-full border border-gray-100 bg-white">
      <span className="text-grey-800 flex h-full items-center border-r border-gray-100 px-3 text-xs whitespace-nowrap lg:px-4">
        {label}
      </span>
      <Select
        items={options}
        value={value}
        onValueChange={(next) => {
          if (next) onChange(next as T);
        }}
      >
        <SelectTrigger
          aria-label={label}
          className="cursor-pointer gap-3 rounded-r-full border-0 px-3 text-xs font-medium text-black data-[size=default]:h-full lg:px-4"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function formatTimeAgo(iso: string, now: number) {
  const seconds = Math.max(
    0,
    Math.floor((now - new Date(iso).getTime()) / 1000),
  );
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Starts as "just now" so the server and first client render match, then
// ticks every second in the browser.
function TimeAgo({ iso }: { iso: string | null }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!iso) return <>—</>;
  if (now === null) return <>just now</>;
  return <>{formatTimeAgo(iso, now)}</>;
}

export default PriceToolbar;
