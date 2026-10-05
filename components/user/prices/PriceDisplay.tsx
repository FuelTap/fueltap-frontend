"use client";

import { toast } from "@/components/ui/toast";
import type { PriceSortOrder } from "@/lib/data/exports";
import {
  getFuelPrices,
  refreshSupplierPrice,
  type FuelType,
  type PricesErrorReason,
  type PricesResult,
  type SupplierPrice,
} from "@/lib/server/prices";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import PriceStateCard, { type PriceState } from "./PriceStateCard";
import PriceToolbar from "./PriceToolbar";
import SupplierPriceCard from "./SupplierPriceCard";

const DEFAULT_SORT: PriceSortOrder = "low-high";
const DEFAULT_FUEL_TYPE: FuelType = "Petrol";

interface Props {
  initialResult: PricesResult;
}

export default function PriceDisplay({ initialResult }: Props) {
  const router = useRouter();

  const [suppliers, setSuppliers] = useState<SupplierPrice[]>(
    initialResult.success ? initialResult.suppliers : [],
  );
  const [syncedAt, setSyncedAt] = useState<string | null>(
    initialResult.success ? initialResult.syncedAt : null,
  );
  // Set when there is no price data to show at all.
  const [loadError, setLoadError] = useState<PricesErrorReason | null>(
    initialResult.success ? null : initialResult.reason,
  );
  // Set when a refresh fails after prices had already loaded.
  const [updateFailed, setUpdateFailed] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<PriceSortOrder>(DEFAULT_SORT);
  const [fuelType, setFuelType] = useState<FuelType>(DEFAULT_FUEL_TYPE);

  const [isRefreshingAll, startRefreshAll] = useTransition();
  const [refreshingIds, setRefreshingIds] = useState<string[]>([]);

  function loadPrices() {
    const hadPrices = syncedAt !== null;

    startRefreshAll(async () => {
      try {
        const result = await getFuelPrices();
        if (result.success) {
          setSuppliers(result.suppliers);
          setSyncedAt(result.syncedAt);
          setLoadError(null);
          setUpdateFailed(false);
        } else if (hadPrices) {
          setUpdateFailed(true);
        } else {
          setLoadError(result.reason);
        }
      } catch {
        // The server action itself couldn't be reached, e.g. the user is offline.
        if (hadPrices) setUpdateFailed(true);
        else setLoadError("network");
      }
    });
  }

  async function refreshSupplier(id: string) {
    setRefreshingIds((ids) => [...ids, id]);
    try {
      const result = await refreshSupplierPrice(id);
      if (result.success) {
        setSuppliers((items) =>
          items.map((item) => (item.id === id ? result.supplier : item)),
        );
      } else {
        toast.add({
          title: "Refresh failed",
          description: result.message,
          type: "error",
        });
      }
    } catch {
      toast.add({
        title: "Refresh failed",
        description: "Please check your connection and try again.",
        type: "error",
      });
    } finally {
      setRefreshingIds((ids) => ids.filter((item) => item !== id));
    }
  }

  function clearFilters() {
    setSearch("");
    setSort(DEFAULT_SORT);
    setFuelType(DEFAULT_FUEL_TYPE);
  }

  const query = search.trim().toLowerCase();
  const visibleSuppliers = suppliers
    .filter((item) => item.fuelType === fuelType)
    .filter(
      (item) =>
        !query ||
        item.supplierName.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query),
    )
    .sort((a, b) =>
      sort === "low-high"
        ? a.pricePerLitre - b.pricePerLitre
        : b.pricePerLitre - a.pricePerLitre,
    );

  // Best price is the cheapest across every supplier of this fuel type, so the
  // badge doesn't move to whichever card happens to match the search.
  const bestPriceId = suppliers
    .filter((item) => item.fuelType === fuelType && item.status === "available")
    .reduce<SupplierPrice | null>(
      (best, item) =>
        !best || item.pricePerLitre < best.pricePerLitre ? item : best,
      null,
    )?.id;

  let state: PriceState | null = null;
  if (loadError) state = loadError;
  else if (updateFailed) state = "update-failed";
  else if (suppliers.length === 0) state = "no-suppliers";
  else if (visibleSuppliers.length === 0) state = "no-results";

  const stateActions: Record<PriceState, () => void> = {
    "no-results": clearFilters,
    network: loadPrices,
    unavailable: loadPrices,
    "update-failed": loadPrices,
    "no-suppliers": () => router.push("/user/order"),
  };

  const hasBestPrice = visibleSuppliers.some((item) => item.id === bestPriceId);

  return (
    <>
      <PriceToolbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        fuelType={fuelType}
        onFuelTypeChange={setFuelType}
        syncedAt={syncedAt}
        isRefreshingAll={isRefreshingAll}
        onRefreshAll={loadPrices}
      />

      {state ? (
        <PriceStateCard
          state={state}
          onAction={stateActions[state]}
          isPending={isRefreshingAll}
        />
      ) : (
        <section
          aria-label="Supplier prices"
          aria-busy={isRefreshingAll}
          className={cn(
            "mt-6 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3",
            hasBestPrice && "pt-7",
          )}
        >
          {visibleSuppliers.map((supplier) => (
            <SupplierPriceCard
              key={supplier.id}
              supplier={supplier}
              isBestPrice={supplier.id === bestPriceId}
              isRefreshing={refreshingIds.includes(supplier.id)}
              onRefresh={refreshSupplier}
            />
          ))}
        </section>
      )}
    </>
  );
}
