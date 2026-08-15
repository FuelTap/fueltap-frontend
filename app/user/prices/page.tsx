"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/helpers/help";
import { ListFilter, Search } from "lucide-react";
import Image from "next/image";

const priceCards = [
  {
    companyLogo: "/assets/user/total.png",
    companyName: "Total Energies",
    price: 985,
    DeliveryTime: "1-2 hrs",
    lastUpdated: "24 sept at 1:am",
    type: "Petrol",
    location: "Lekki, Lagos",
    bestPrice: true,
  },
  {
    companyLogo: "/assets/user/total.png",
    companyName: "Mobil 1",
    price: 985,
    DeliveryTime: "1-2 hrs",
    lastUpdated: "24 sept at 1:am",
    type: "Petrol",
    location: "Lekki, Lagos",
    bestPrice: false,
  },
  {
    companyLogo: "/assets/user/total.png",
    companyName: "RestoPark",
    price: 985,
    DeliveryTime: "1-2 hrs",
    lastUpdated: "24 sept at 1:am",
    type: "Petrol",
    location: "Lekki, Lagos",
    bestPrice: false,
  },
];

const products = [
  { label: "All products", value: "all" },
  { label: "Petrol", value: "petrol" },
  { label: "Diesel", value: "diesel" },
  { label: "Kerosene", value: "kerosene" },
];

// sort by price
const sortByPrice = [
  { label: "Price: low to high", value: "low to high" },
  { label: "Price: high to low", value: "high to low" },
];

const PriceComparison = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl! font-semibold">Price Comparison</h1>
        <p className="text-grey-800 text-xl font-normal">
          Compare prices from suppliers in real time
        </p>
      </div>

      <div className="my-6 flex items-center gap-4 md:gap-6">
        <div className="basis-1/2">
          <Input placeholder="Search by company name" type="search" />
        </div>
        <div className="basis-1/2">
          <div className="space-x-4 flex items-center ">
            <span className="flex items-center justify-center gap-2 text-sm">
              <h5>Filters</h5>
              <ListFilter size={16} className="text-primary-500 text-sm" />
            </span>

            <Select items={sortByPrice}>
              <SelectTrigger className="w-[40%] px-2 bg-gray-100 h-12! cursor-pointer">
                <SelectValue
                  className={"text-green-500"}
                  placeholder="Sort by price"
                />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {sortByPrice.map((item) => (
                    <SelectItem
                      className={
                        "hover:bg-green-500! hover:text-white! cursor-pointer"
                      }
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select items={products}>
              <SelectTrigger className="w-[40%] px-2 bg-gray-100 h-12! cursor-pointer">
                <SelectValue
                  className={"text-[#C99901]"}
                  placeholder="Petrol"
                />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {products.map((item) => (
                    <SelectItem
                      className={
                        "hover:bg-[#C99901]! hover:text-white! cursor-pointer"
                      }
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
        {priceCards.map(
          (
            {
              companyLogo,
              companyName,
              price,
              type,
              DeliveryTime,
              lastUpdated,
              location,
              bestPrice,
            },
            index,
          ) => (
            <article
              className={`${bestPrice ? "rounded-tr-none" : ""} border-neutra-500 relative h-65.75 space-y-8 rounded-3xl border-[0.3px] px-4 py-6 shadow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
              key={index}
            >
              {bestPrice && (
                <div className="absolute -top-8 right-0 flex h-8 w-21 items-center justify-center rounded-t-xl bg-green-500 p-2 pb-1">
                  <p className="text-xs text-white!">Best Price</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={companyLogo}
                    className="border-neutra-500 rounded-sm border-[0.3px] p-2"
                    alt={companyName}
                    width={64}
                    height={64}
                  />
                  <div className="flex flex-col gap-2">
                    <h2>{companyName}</h2>
                    <h5 className="text-secondary-600 text-[14px] font-medium">
                      {type}
                    </h5>
                    <h6>{location}</h6>
                  </div>
                </div>

                <h2 className={`${bestPrice ? "text-green-400" : ""} text-3xl`}>
                  {formatCurrency(price)}
                  <span className="text-neutra-1000 hidden text-right text-sm font-medium md:block">
                    per litre
                  </span>
                  <span className="text-neutra-1000 text-sm font-medium md:hidden">
                    /ltr
                  </span>
                </h2>
              </div>
              <div>
                <div className="text-neutra-1000 text-[16px] mb-2 flex items-center font-normal md:justify-between">
                  <h5 className="text-neutra-900">Delivery Time:</h5>
                  <h5 className="text-black">{DeliveryTime}</h5>
                </div>
                <div className="text-neutra-800 text-[16px] flex items-center font-normal md:justify-between">
                  <h5>Last updated:</h5>
                  <h5>{lastUpdated}</h5>
                </div>
              </div>
              <Button size={"full"}>Update Price</Button>
            </article>
          ),
        )}
      </section>
    </>
  );
};

export default PriceComparison;
