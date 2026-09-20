"use client";

import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableSelectProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
export function SearchableSelect({
  items = [],
  value,
  onChange,
  placeholder,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={`${buttonVariants({ variant: "outline" })} h-12 px-3 py-1 w-full text-left!  rounded-[999px]! justify-between border-4`}
        role="combobox"
        aria-expanded={open}
      >
        {value ? (
          <span className="truncate text-left">{value}</span>
        ) : (
          <div className="flex items-center  text-grey-800 w-full justify-between">
            <span className="text-xs font-normal">{placeholder}</span>
            <ChevronDown />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search bank..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((item, idx) => (
                <CommandItem
                  key={idx}
                  onSelect={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
