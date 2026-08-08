"use client";
import { splitName } from "@/lib/helpers/help";
import { useState } from "react";
import Logo from "../web/Logo";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { Bell, Bug, Menu, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { links } from "@/lib/data/exports";
import Link from "next/link";

export default function UserHeader() {
  const name = "ochife ogechukwu";
  // ✨ Get initials dynamically
  const initials = splitName?.(name);

  //   // logout
  //   const logout = useLogout();

  const [open, setOpen] = useState(false);
  return (
    <header className="flex items-center justify-between ">
      <Logo />

      {/* ===== Mobile Sheet (Sidebar) ===== */}
      <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
        <DrawerTrigger
          className="-order-1 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </DrawerTrigger>

        <DrawerContent className="pt-6 [&>button]:hidden">
          <DrawerHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h5 className="text-[15px] font-medium text-black capitalize">
                    {name}
                  </h5>
                  <p className="text-sm text-neutral-500">Premium member</p>
                </div>
              </div>
              <button
                className="rounded-md p-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
          </DrawerHeader>

          {/* ✅ Search Input */}
          <div className="relative px-1">
            <input
              type="text"
              tabIndex={-1}
              placeholder="Search..."
              className="focus:border-primary w-full rounded-xl border border-neutral-300 py-2.5 pr-10 pl-4 text-[15px] outline-none"
            />
            <Search
              size={20}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
            />
          </div>

          {/* ✅ Nav Links */}
          <div className="mt-2 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                onClick={() => setOpen(false)}
                key={link.path}
                href={link.path}
                className={`rounded-lg rounded-l-none py-2 pl-4 text-[15px] capitalize transition-all ${
                  false
                    ? "border-primary text-primary border-l-8 font-medium"
                    : "text-neutral-700 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* report */}
          <div className="mt-auto mb-4 flex flex-col items-center justify-center justify-self-end">
            <div className="flex items-center gap-2">
              <span>Report an issue</span>
              <Bug />
            </div>

            {true && (
              <div className="text-error flex items-center gap-2">
                {/* <MdLogout onClick={() => logout()} /> */}
                <span>Log Out</span>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* ===== Desktop Links ===== */}
      <nav className="hidden items-center gap-8 lg:flex">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={
              false
                ? "text-lg-medium text-black transition-all"
                : "text-lg-regular text-neutral-700 transition-all hover:text-black"
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* ===== Right Section (Desktop) ===== */}
      <div className="hidden items-center gap-6 lg:flex">
        <Search size={21} className="cursor-pointer text-neutral-700" />
        <Bell size={21} className="cursor-pointer text-neutral-700" />
        <div className="flex items-center gap-2">
          <div>
            <h5 className="text-[14px] text-black capitalize">{name}</h5>
            <h5 className="text-[14px] text-neutral-900 capitalize">
              Premium member
            </h5>
          </div>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* ===== Small Screens Avatar ===== */}
      <Avatar className="lg:hidden">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </header>
  );
}
