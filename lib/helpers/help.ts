export function splitName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions,
) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    ...options,
  }).format(value);
