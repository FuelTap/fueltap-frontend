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
import {
  Bell,
  Bug,
  ChevronDown,
  LifeBuoy,
  LogOut,
  Menu,
  Search,
  Settings,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { links } from "@/lib/data/exports";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function UserHeader() {
  const { user, logout } = useAuth();
  const initials = splitName?.(user?.full_name || "user");

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { back } = useRouter();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);
  const activeLink = links.find((link) => isActive(link.path));

  const simpleHeaderPaths = ["/user/kyc", "/user/link-bank", "/user/set-pin"];
  const showSimpleHeader = simpleHeaderPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (showSimpleHeader) {
    return (
      <header className="relative inset-x-0 top-0 z-10 w-full bg-linear-to-r from-[#DDDEFC] to-[#E7F8F2] py-2 md:fixed after:absolute after:bottom-0 after:left-0 after:h-0.75 after:w-full after:bg-accent after:content-['']">
        <div className="container flex items-center justify-between gap-4">
          <Logo />
          <Button
            type="button"
            onClick={() => back()}
            variant="outline"
            className="rounded-[999px] border-primary p-4 text-primary"
          >
            Back
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className="inset-x-0 top-0 z-10 w-full border-b border-gray-100 bg-white md:fixed">
      <div className="container flex items-center justify-between gap-4 py-3 xl:py-4">
        {/* ===== Menu + current page (below xl) ===== */}
        <div className="flex flex-1 items-center gap-4 xl:hidden">
          <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
            <DrawerTrigger
              aria-label="Open menu"
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Menu size={24} />
            </DrawerTrigger>

            <DrawerContent className="pt-6 [&>button]:hidden">
              <DrawerHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar initials={initials} />
                    <div className="min-w-0">
                      <h5 className="text-[15px] font-medium text-black capitalize">
                        {user?.full_name}
                      </h5>
                      <p className="truncate text-sm text-neutral-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    aria-label="Close menu"
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
                      isActive(link.path)
                        ? "border-primary text-primary border-l-8 font-medium"
                        : "text-neutra-800 hover:text-black"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* report */}
              <div className="mt-auto mb-4 flex flex-col items-center justify-center justify-self-end gap-2">
                <div className="flex items-center gap-2">
                  <span>Report an issue</span>
                  <Bug />
                </div>

                <button
                  type="button"
                  className="text-error flex cursor-pointer items-center gap-2"
                  onClick={() => logout()}
                >
                  <LogOut />
                  <span>Log Out</span>
                </button>
              </div>
            </DrawerContent>
          </Drawer>

          {activeLink && (
            <span className="text-primary-500 hidden text-base font-medium md:inline">
              {activeLink.name}
            </span>
          )}
        </div>

        {/* ===== Logo (centred below xl) ===== */}
        <div className="flex shrink-0 justify-center xl:justify-start">
          <Logo />
        </div>

        {/* ===== Desktop Links ===== */}
        <nav className="hidden items-center gap-8 xl:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              aria-current={isActive(link.path) ? "page" : undefined}
              className={cn(
                "text-base transition-colors",
                isActive(link.path)
                  ? "text-primary-500 font-medium"
                  : "text-grey-800 hover:text-black",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ===== Notifications + account ===== */}
        <div className="flex flex-1 items-center justify-end gap-4 xl:flex-none xl:gap-6">
          <button
            type="button"
            aria-label="Notifications"
            className="text-grey-800 hidden cursor-pointer hover:text-black md:block"
          >
            <Bell size={22} />
          </button>

          <Popover>
            <PopoverTrigger
              aria-label="Account menu"
              className="flex cursor-pointer items-center gap-2 text-left"
            >
              <span className="hidden max-w-40 flex-col md:flex">
                <span className="truncate text-base text-black capitalize">
                  {user?.full_name}
                </span>
                <span className="text-grey-800 truncate text-sm">
                  {user?.email}
                </span>
              </span>
              <UserAvatar initials={initials} />
              <ChevronDown size={20} className="text-black" />
            </PopoverTrigger>

            <PopoverContent align="end" className="w-60 gap-1 p-2">
              <div className="border-b border-gray-100 px-2 pt-1 pb-2 md:hidden">
                <p className="truncate font-medium text-black capitalize">
                  {user?.full_name}
                </p>
                <p className="text-grey-800 truncate text-xs">{user?.email}</p>
              </div>
              <Link
                href="/user/account-settings"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-black hover:bg-gray-100"
              >
                <Settings size={16} />
                Account Settings
              </Link>
              <Link
                href="/support"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-black hover:bg-gray-100"
              >
                <LifeBuoy size={16} />
                Help & Support
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="text-error flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-red-50"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}

function UserAvatar({ initials }: { initials: string }) {
  return (
    <Avatar className="size-10 xl:size-11">
      <AvatarFallback className="bg-blue-600 text-sm font-medium text-white xl:text-base">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
