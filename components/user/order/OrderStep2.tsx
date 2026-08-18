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
  LocateFixed,
  User,
  Users,
} from "lucide-react";
import { useOrder } from "@/context/OrderProvider";
import { useRouter } from "next/navigation";
import { registerationSchema } from "@/lib/validators/authSchema";
import Searching from "./Searching";
import TimePicker from "./TimePicker";

const orderFrequency = [
  {
    icon: <Box size={24} />,
    label: "One-Time",
    description: "Place a single order. Does NOT repeat",
  },
  {
    icon: <AlarmClockCheck size={24} />,
    label: "Recurring",
    description: "Schedule a future or  repeating order",
  },
];

export const orderOptions = [
  {
    icon: <User size={18} />,
    label: "for you",
    key: "personal",
  },
  {
    icon: <Users size={18} />,
    label: "for a friend",
    key: "others",
  },
];

const OrderStep2 = () => {
  const { selectedAddress, orderType } = useOrder();
  console.log("address :", selectedAddress);
  const { push } = useRouter();

  const [typeSelected, setTypeSelected] = useState(orderType);
  console.log(typeSelected);

  const [frequency, setFrequency] = useState("One-Time");
  const [type, setType] = useState("Petrol");
  const [amount, setAmount] = useState(10);

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
      typeSelected,
      frequency,
      type,
      amount,
      time,
      activeDay,
    };

    // navigate to the searching route and pass the payload in location state
    push("searching");
  };

  if (searching) return <Searching />;
  return (
    <div className="h-[85dvh] w-screen max-w-190.5 overflow-hidden px-3 py-6 hover:overflow-y-scroll md:h-[90dvh] md:p-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg-medium">
          {selectedAddress?.display_name || "empty"}
        </h5>
        <LocateFixed className="text-2xl text-yellow-700" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} id="purchase-form">
        <FieldGroup>
          <div className="mt-5 flex items-center gap-3">
            {orderOptions.map(({ key, label, icon }) => (
              <button
                type="button"
                className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-3 text-lg ${typeSelected === key ? "border-primary-400 text-primary-400" : ""}`}
                key={key}
                onClick={() => {
                  setTypeSelected(key);
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
          {typeSelected === "personal" ? (
            // frequency
            <div className="mt-5">
              <p>Frequency</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                {orderFrequency.map(({ description, label, icon }) => (
                  <button
                    type="button"
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border-[0.5px] p-3 text-start ${frequency === label ? "border-secondary-400 text-secondary-400 bg-secondary-400/10" : ""}`}
                    key={label}
                    onClick={() => {
                      setFrequency(label);
                    }}
                  >
                    {icon}
                    <div className="flex flex-col">
                      <p>{label}</p>
                      <small className="text-grey-600 text-sm">
                        {description}
                      </small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <Controller
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fullName" className={"text-sm"}>
                      Friend's Name
                    </FieldLabel>

                    <Input
                      id="fullName"
                      placeholder="Ochife Ogechukwu"
                      {...field}
                    />

                    {fieldState.error && fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone" className={"text-sm"}>
                      Phone Number
                    </FieldLabel>

                    <div className="flex">
                      <div className="text-primary-400 bg-primary-50 flex items-center justify-center gap-2 rounded-l px-2">
                        <span className="text-xl">NGN</span>
                        <ChevronDown />
                      </div>

                      <Input
                        placeholder="90 22473 2723"
                        inputMode="numeric"
                        onInput={(e: any) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          );
                        }}
                        className={
                          "focus-visible:border-ring focus-visible:ring-ring/50 rounded-l-none border-l-0 focus-visible:border-l-0 focus-visible:ring-[1px]"
                        }
                        {...field}
                      />
                    </div>

                    {fieldState.error && fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          )}
          {/* recurring */}
          {frequency === "Recurring" && (
            <div className="mt-8">
              <h4 className="text-sm">Set date and time</h4>
              <div>
                <input type="time" min="09:00" max="17:00" />

                <TimePicker
                // value={time}
                // onChange={setTime}
                // disabledTimes={[
                //   { hour: "18", minute: "00" },
                //   { hour: "18", minute: "30" },
                //   { hour: "19", minute: "00" },
                //   { hour: "19", minute: "30" },
                // ]}
                />
              </div>

              <div className="bg-secondary-400/10 rounded-2xl p-3">
                {/* here */}
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="text-sm">Every {activeDay}</h4>
                  <CalendarDays />
                </div>
                <div className="flex items-center justify-between">
                  {weeks.map(({ day, label }) => (
                    <Button
                      type="button"
                      className={`${day === "Sunday" && "text-error!"} ${activeDay === day ? "bg-secondary-400 hover:bg-secondary-400! text-white!" : "bg-transparent"} basis-[14%] rounded-2xl p-2 text-gray-700 hover:bg-transparent`}
                      key={day}
                      onClick={() => setActiveDay(day)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* fuel type */}
          <div className="mt-5">
            <h4 className="text-sm">Fuel Type</h4>
            <div className="bg-primary-50 mt-4 rounded-3xl">
              {fuelType.map(({ text }) => (
                <Button
                  key={text}
                  type="button"
                  className={` ${type === text ? "bg-primary text-white!" : "bg-transparent"} text-primary-400 hover:bg- w-1/3 rounded-3xl transition-colors duration-100 md:p-6`}
                  onClick={() => {
                    setType(text);
                  }}
                >
                  {text}
                </Button>
              ))}
            </div>
            <small className="text-gray-700">
              *LPG (Liquified Petroleum Gas) i.e cooking gas
            </small>
          </div>
          {/* amount */}
          <div className="mt-5">
            <h4 className="text-sm">Amount</h4>
            <div className="mt-4 flex items-center justify-between">
              {fuelLiters.map(({ text }) => (
                <Button
                  type="button"
                  key={text}
                  className={` ${amount === text ? "bg-yellow-600 text-white!" : "bg-transparent"} hover:bg- basis-[24.5%] rounded-sm border-[0.5px] text-gray-700 transition-colors duration-100 md:p-6`}
                  onClick={() => {
                    setAmount(text);
                  }}
                >
                  <span>{text}L</span>
                </Button>
              ))}
            </div>
          </div>
          {/* submit */}
          <div className="mt-6">
            <Button
              // type="submit"
              type="button"
              onClick={() => {
                setSearching(true);
                setTimeout(() => {
                  setSearching(false);
                  push("/user/order/suppliers-found");
                }, 3000);
              }}
              variant={"secondary"}
              className={`h-13 w-full rounded-3xl p-6 text-white`}
            >
              Submit Order
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default OrderStep2;
