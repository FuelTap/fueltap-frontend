import React, { useState } from "react";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";

// Generate hours (01 to 12)
const hoursOptions = Array.from({ length: 12 }, (_, i) => {
  const value = String(i + 1).padStart(2, "0");
  return { label: value, value };
});

// Generate minutes (00 to 59)
const minutesOptions = Array.from({ length: 60 }, (_, i) => {
  const value = String(i).padStart(2, "0");
  return { label: value, value };
});

const periodOptions = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

export default function TimePicker() {
  const [hour, setHour] = useState("11");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState("AM");

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-sm font-light mb-4 text-foreground">
        Set date and time
      </h2>

      {/* 
        Custom CSS Scope targeting the active/selected list item container 
        and enforcing your custom 'text-accent' class.
      */}
      <div className="w-full flex items-center justify-center gap-2 [&_[role='option'][aria-selected='true']]:text-accent! [&_[role='option'][aria-selected='true']]:font-bold">
        <WheelPickerWrapper className="h-48 w-full flex justify-center bg-transparent">
          {/* Hours Column */}
          <div className="w-16">
            <WheelPicker
              options={hoursOptions}
              value={hour}
              onValueChange={setHour}
              infinite={true}
            />
          </div>

          {/* Separator Colon */}
          <div className="flex items-center justify-center font-bold text-xl px-1 text-muted-foreground self-center h-full mb-1">
            :
          </div>

          {/* Minutes Column */}
          <div className="w-16">
            <WheelPicker
              options={minutesOptions}
              value={minute}
              onValueChange={setMinute}
              infinite={true}
            />
          </div>

          {/* Spacer */}
          <div className="w-4" />

          {/* AM/PM Column */}
          <div className="w-16">
            <WheelPicker
              options={periodOptions}
              value={period}
              onValueChange={setPeriod}
              infinite={false}
            />
          </div>
        </WheelPickerWrapper>
      </div>

      {/* Selected Time Display Output */}
      <div className="mt-6 text-sm text-muted-foreground">
        Alarm set for:{" "}
        <span className="font-mono text-base font-bold text-foreground">
          {hour}:{minute} {period}
        </span>
      </div>
    </div>
  );
}
