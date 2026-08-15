"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchParamsQuery(query: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  function handleSearchParams(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    // 2. Set or delete the parameter
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }

    // 3. Update the URL state smoothly
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return { handleSearchParams, searchParams };
}
