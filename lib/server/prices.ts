"use server";

// There is no prices endpoint on the backend yet, so these actions serve mock
// data. When the endpoint exists, replace the bodies with
// authenticatedApiRequest calls and keep the return types unchanged.

export type FuelType = "Petrol" | "Diesel" | "Cooking Gas";

export type SupplierPrice = {
  id: string;
  supplierName: string;
  logoUrl: string | null;
  fuelType: FuelType;
  pricePerLitre: number;
  location: string;
  deliveryTime: string;
  lastUpdated: string; // ISO date
  // "error" means the supplier is listed but its latest price couldn't be loaded.
  status: "available" | "error";
};

export type PricesErrorReason = "network" | "unavailable";

export type PricesResult =
  | { success: true; suppliers: SupplierPrice[]; syncedAt: string }
  | { success: false; reason: PricesErrorReason };

export type SupplierPriceResult =
  | { success: true; supplier: SupplierPrice }
  | { success: false; message: string };

// ========================MOCK DATA========================
// Switch this to preview each state from the designs.
// "update-failed" loads once, then fails every later "Refresh all prices".
type MockScenario =
  | "success"
  | "card-error"
  | "no-suppliers"
  | "network"
  | "unavailable"
  | "update-failed";

const MOCK_SCENARIO = "success" as MockScenario;

const MOCK_DELAY_MS = 500;

let mockLoadCount = 0;

const mockStations = [
  {
    key: "total",
    supplierName: "Total Energies",
    logoUrl: "/assets/user/total.png",
    location: "VI, Lagos",
    deliveryTime: "1-2hrs",
    prices: { Petrol: 980, Diesel: 1150, "Cooking Gas": 1250 },
  },
  {
    key: "mobil",
    supplierName: "Mobil",
    logoUrl: null,
    location: "VI, Lagos",
    deliveryTime: "1-2hrs",
    prices: { Petrol: 985, Diesel: 1140, "Cooking Gas": 1270 },
  },
  {
    key: "sobaz",
    supplierName: "Sobaz",
    logoUrl: null,
    location: "Lekki, Lagos",
    deliveryTime: "1-2hrs",
    prices: { Petrol: 982, Diesel: 1160, "Cooking Gas": 1240 },
  },
  {
    key: "nnpc",
    supplierName: "NNPC Mega Station",
    logoUrl: null,
    location: "Ikoyi, Lagos",
    deliveryTime: "2-3hrs",
    prices: { Petrol: 990, Diesel: 1135, "Cooking Gas": 1260 },
  },
  {
    key: "conoil",
    supplierName: "Conoil",
    logoUrl: null,
    location: "Ajah, Lagos",
    deliveryTime: "2-3hrs",
    prices: { Petrol: 995, Diesel: 1170, "Cooking Gas": 1255 },
  },
  {
    key: "oando",
    supplierName: "Oando",
    logoUrl: null,
    location: "Yaba, Lagos",
    deliveryTime: "1-2hrs",
    prices: { Petrol: 987, Diesel: 1155, "Cooking Gas": 1265 },
  },
] satisfies {
  key: string;
  supplierName: string;
  logoUrl: string | null;
  location: string;
  deliveryTime: string;
  prices: Record<FuelType, number>;
}[];

function buildMockSuppliers(): SupplierPrice[] {
  const lastUpdated = new Date(Date.now() - 20 * 60 * 1000).toISOString();

  return mockStations.flatMap((station) =>
    (Object.keys(station.prices) as FuelType[]).map((fuelType) => ({
      id: `${station.key}-${fuelType.toLowerCase().replace(" ", "-")}`,
      supplierName: station.supplierName,
      logoUrl: station.logoUrl,
      fuelType,
      pricePerLitre: station.prices[fuelType],
      location: station.location,
      deliveryTime: station.deliveryTime,
      lastUpdated,
      status:
        MOCK_SCENARIO === "card-error" && station.key === "mobil"
          ? "error"
          : "available",
    })),
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ========================GET PRICES========================
export async function getFuelPrices(): Promise<PricesResult> {
  await wait(MOCK_DELAY_MS);

  mockLoadCount += 1;

  if (MOCK_SCENARIO === "network" || MOCK_SCENARIO === "unavailable") {
    return { success: false, reason: MOCK_SCENARIO };
  }
  if (MOCK_SCENARIO === "update-failed" && mockLoadCount > 1) {
    return { success: false, reason: "network" };
  }

  return {
    success: true,
    suppliers: MOCK_SCENARIO === "no-suppliers" ? [] : buildMockSuppliers(),
    syncedAt: new Date().toISOString(),
  };
}

// ========================REFRESH ONE SUPPLIER========================
export async function refreshSupplierPrice(
  id: string,
): Promise<SupplierPriceResult> {
  await wait(MOCK_DELAY_MS);

  const supplier = buildMockSuppliers().find((item) => item.id === id);
  if (!supplier) {
    return { success: false, message: "Supplier not found." };
  }

  return {
    success: true,
    supplier: {
      ...supplier,
      status: "available",
      lastUpdated: new Date().toISOString(),
    },
  };
}
