"use client";
import { fuelLiters, fuelType, weeks } from "@/lib/data/exports";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AlarmClockCheck,
  Box,
  CalendarDays,
  ChevronDown,
  Clock,
  ClockFading,
  LocateFixed,
  User,
  Users,
} from "lucide-react";
import { useOrder } from "@/context/OrderProvider";
import { useRouter } from "next/navigation";
import { registerationSchema } from "@/lib/validators/authSchema";
import Searching from "./Searching";

const orderFrequency = [
  {
    icon: <ClockFading className="size-4 md:size-5 2xl:size-6" />,
    label: "One-Time",
    description: "Order fuel once, whenever you need it.",
  },
  {
    icon: <Clock className="size-4 md:size-5 2xl:size-6" />,
    label: "Recurring",
    description: "Regular fuel deliveries on a schedule",
  },
];

const OrderStep2 = () => {
  const { selectedAddress, orderType } = useOrder();
  console.log("address :", selectedAddress);
  const { push, back } = useRouter();

  const [frequency, setFrequency] = useState("One-Time");
  const [type, setType] = useState("Petrol");
  const [amount, setAmount] = useState(5);

  const [time, setTime] = useState({ hour: "10", minute: "30" });
  const [activeDay, setActiveDay] = useState("Monday");

  const [searching, setSearching] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });
  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      orderType,
      frequency,
      type,
      amount,
      time,
      activeDay,
    };

    // navigate to the searching route and pass the payload in location state
    // push("searching");
    setSearching(true);
  };

  return (
    <>
      {searching && (
        <Searching searching={searching} onSearchingChange={setSearching} />
      )}
      <div className="w-screen bg-neutral-400 border border-gray-100 flex flex-col  p-5 h-100 md:h-120 2xl:min-h-140! md:w-125! rounded-2xl lg:w-140! md:p-8 ">
        <div className="space-y-2  ">
          <h2 className="text-sm md:text-base font-medium lg:text-xl">
            What fuel do you need?
          </h2>
          <p className="text-grey-800 text-sm lg:text-base font-normal">
            Choose your fuel type, quantity, and delivery schedule.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} id="purchase-form">
          <FieldGroup>
            {/* fuel type */}
            <div className="mt-4">
              <h4 className="text-sm font-medium">Fuel Type</h4>
              <div className=" flex items-center justify-between   my-4 rounded-3xl">
                {fuelType.map(({ text }) => (
                  <Button
                    key={text}
                    type="button"
                    className={` ${type === text ? "bg-primary text-white!" : "bg-transparent text-grey-800 hover:text-white"}  border border-grey-200 p-3 basis-[33%] rounded-[999px] h-9 md:h-11 flex items-center justify-center text-sm transition-all ease-in-out duration-150 `}
                    onClick={() => {
                      setType(text);
                    }}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="">
              <h4 className="text-sm font-medium">Quantity</h4>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center w-full h-12.5">
                  <span className="flex justify-center items-center rounded-l-[999px] bg-gray-100 text-primary-400 basis-[20%] h-full">
                    Litre(s)
                  </span>
                  <Input
                    type="number"
                    min={5}
                    placeholder="Enter preferred quantity"
                    className="h-full! rounded-l-none! rounded-r-[999px]!"
                  />
                </div>
              </div>
            </div>

            {/* or */}

            <div className="my-3 flex items-center justify-center">
              <small className="text-xs text-grey-800 font-medium">OR</small>
            </div>
            {/* quick picks */}
            <div className="">
              <h4 className="text-sm font-medium">Quick picks</h4>
              <div className="mt-1 flex items-center justify-between">
                {fuelLiters.map(({ text }) => (
                  <Button
                    type="button"
                    key={text}
                    className={` ${amount === text ? "bg-primary text-white!" : "bg-transparent hover:text-grey-200 text-grey-800"} border border-grey-200 p-3 basis-[24%] rounded-[999px] h-9 md:h-11 flex items-center justify-center text-sm transition-all ease-in-out duration-150 `}
                    onClick={() => {
                      setAmount(text);
                    }}
                  >
                    <span>{text}L</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="">
              <h4 className="text-sm font-medium">Frequency</h4>
              <div className="mt-1 flex gap-2 items-center justify-between">
                {orderFrequency.map(({ icon, label, description }, index) => (
                  <button
                    className={`flex  w-full cursor-pointer  md:items-center flex-col md:flex-row  gap-2 rounded-lg border border-grey-200 p-3  ${frequency === label ? "border-primary-400 text-primary-400 bg-linear-to-br from-[#DDDEFC] to-[#E7F8F2]" : "bg-transparent text-black border-0"} hover:border-primary-400 hover:text-primary-400 hover:bg-linear-to-br hover:from-[#DDDEFC] hover:to-[#E7F8F2] transition-all duration-150 ease-in-out`}
                    key={index}
                    onClick={() => setFrequency(label)}
                  >
                    <span className="size-7.5 md:size-12.5 rounded-full flex items-center justify-center bg-linear-to-br from-[#D7DBFA] to-white border border-gray-100 text-primary!">
                      {icon}
                    </span>
                    <span className="flex flex-col items-start gap-0.5">
                      <span className="text-xs md:text-sm lg:text-base  text-black font-medium">
                        {label}
                      </span>

                      <span className="text-start text-[8px] md:text-xs text-grey-800">
                        {description}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* submit */}

            <div className="flex items-center gap-1 mt-auto!">
              <Button
                variant={"outline"}
                size={"full"}
                className={
                  "text-primary border-primary outline-primary max-sm:p-2 basis-1/2"
                }
                type="button"
                onClick={() => back()}
              >
                Back
              </Button>

              <Button
                type="submit"
                onClick={() => {
                  setSearching(true);
                  setTimeout(() => {
                    setSearching(false);
                    push("/user/order/suppliers-found");
                  }, 3000);
                }}
                size={"full"}
                className={`max-sm:p-2 basis-1/2`}
              >
                Submit Order
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </>
  );
};

export default OrderStep2;
