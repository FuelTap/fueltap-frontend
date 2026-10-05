"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  fuelType as fuelTypes,
  priceSortOptions,
  type PriceSortOrder,
} from "@/lib/data/exports";
import type { FuelType } from "@/lib/server/prices";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Props {
  sort: PriceSortOrder;
  onSortChange: (sort: PriceSortOrder) => void;
  fuelType: FuelType;
  onFuelTypeChange: (fuelType: FuelType) => void;
}

// Mobile replacement for the inline Price and Fuel Type selects.
const PriceFilterDrawer = ({
  sort,
  onSortChange,
  fuelType,
  onFuelTypeChange,
}: Props) => {
  return (
    <Drawer>
      <DrawerTrigger className="text-grey-800 flex h-12 shrink-0 cursor-pointer items-center gap-3 rounded-full border border-gray-100 bg-white px-4 text-sm">
        Filter
        <ChevronDown className="size-4" />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg">Filter prices</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-6 p-4">
          <OptionGroup
            label="Price"
            options={priceSortOptions}
            value={sort}
            onChange={onSortChange}
          />
          <OptionGroup
            label="Fuel Type"
            options={fuelTypes.map(({ text }) => ({
              label: text,
              value: text as FuelType,
            }))}
            value={fuelType}
            onChange={onFuelTypeChange}
          />
        </div>

        <DrawerFooter className="pb-6">
          <DrawerClose
            render={
              <Button
                size="full"
                className="bg-primary-500 hover:bg-primary-500/90 h-12 rounded-full text-white"
              />
            }
          >
            Done
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function OptionGroup<T extends string>({
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
    <fieldset>
      <legend className="text-grey-800 mb-2 text-sm">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2 text-sm transition-colors",
              option.value === value
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-black",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default PriceFilterDrawer;
