"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useOrder } from "@/context/OrderProvider";
import { useRouter } from "next/navigation";

// debounce helper
function debounce(fn: any, delay = 2000) {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default function SearchAddressInput() {
  const { setSelectedAddress, selectedAddress } = useOrder();
  const [query, setQuery] = useState(selectedAddress?.display_name || "");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const search = async (q: string) => {
    if (!q || q.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&street=${q}`,
      );
      const data = await res.json();
      console.log(data);
      setResults(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const debouncedSearch = debounce(search, 2500);

  useEffect(() => {
    if (query.trim() !== "") {
      debouncedSearch(query);
      setShowResults(true);
    } else {
      setShowResults(false);
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative w-full">
      <Input
        placeholder="Enter delivery address"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length > 2 && setShowResults(true)}
      />

      {showResults && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
          {loading && (
            <div className="p-3 text-sm text-gray-500">Searching...</div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-3 text-sm text-gray-500">No results found.</div>
          )}

          {results.map((item: any) => (
            <div
              key={item?.place_id}
              className={cn(
                "cursor-pointer p-3 text-sm transition hover:bg-gray-100",
              )}
              onClick={() => {
                const selected = {
                  display_name: item.display_name,
                  lat: item.lat,
                  lng: item.lon,
                };
                // onChange(selected);
                setQuery(item.display_name);
                setShowResults(false);
                setSelectedAddress(selected);
                push("/order/step-2");
              }}
            >
              {item.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
