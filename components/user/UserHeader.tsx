"use client";
import { splitName } from "@/lib/helpers/help";
import { useEffect, useState } from "react";
import Logo from "../web/Logo";
import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { links } from "@/lib/data/exports";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/hooks/useScrollLock";

const accountItemClassName =
  "flex w-full cursor-pointer items-center px-6 py-3 text-left text-sm text-black transition-colors hover:bg-gray-100 md:px-7 md:py-3.5 md:text-base";

export default function UserHeader() {
  const { user, logout } = useAuth();
  const initials = splitName?.(user?.full_name || "user");

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const { back } = useRouter();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);
  const activeLink = links.find((link) => isActive(link.path));

  // The header only stays pinned from md up, so on mobile an open menu or
  // dropdown would scroll away with the page. Lock scrolling while they're open.
  useScrollLock(
    menuOpen ||
      (accountOpen && window.matchMedia("(max-width: 767px)").matches),
  );

  // Close the nav menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

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
    <header
      className={cn(
        "relative inset-x-0 top-0 w-full border-b border-gray-100 bg-white md:fixed",
        // Sit above page content (e.g. the order map) while the menu overlay is open.
        menuOpen ? "z-1100" : "z-10",
      )}
    >
      <div className="container flex items-center justify-between gap-4 py-3 xl:py-4">
        {/* ===== Menu toggle + current page (below xl) ===== */}
        <div className="flex flex-1 items-center gap-4 xl:hidden">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="header-nav-menu"
            className="cursor-pointer text-black"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

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
          <NavLinks isActive={isActive} />
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

          <Popover
            open={accountOpen}
            onOpenChange={(open) => {
              setAccountOpen(open);
              if (open) setMenuOpen(false);
            }}
          >
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
              <ChevronDown
                size={20}
                className={cn(
                  "text-black transition-transform duration-200",
                  accountOpen && "rotate-180",
                )}
              />
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-60 gap-0 divide-y divide-gray-100 overflow-hidden rounded-xl p-0 md:w-94"
            >
              <Link
                href="/user/account-settings"
                className={accountItemClassName}
                onClick={() => setAccountOpen(false)}
              >
                Account Settings
              </Link>
              {/* The bell is hidden on mobile, so notifications live here instead. */}
              <button
                type="button"
                className={cn(accountItemClassName, "md:hidden")}
                onClick={() => setAccountOpen(false)}
              >
                Notification
              </button>
              <button
                type="button"
                className={accountItemClassName}
                onClick={() => {
                  setAccountOpen(false);
                  logout();
                }}
              >
                Log Out
              </button>
              <Link
                href="/support"
                className={accountItemClassName}
                onClick={() => setAccountOpen(false)}
              >
                Help & Support
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* ===== Nav menu overlay (below xl) ===== */}
      {menuOpen && (
        <div
          id="header-nav-menu"
          className="absolute inset-x-0 top-full h-dvh bg-black/25 xl:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="container pt-2">
            <nav
              aria-label="Main"
              className="flex w-full items-center justify-between gap-4 rounded-full bg-white px-6 py-3 shadow-sm md:w-fit md:justify-start md:gap-6 md:px-7"
              onClick={(e) => e.stopPropagation()}
            >
              <NavLinks
                isActive={isActive}
                onNavigate={() => setMenuOpen(false)}
              />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLinks({
  isActive,
  onNavigate,
}: {
  isActive: (path: string) => boolean;
  onNavigate?: () => void;
}) {
  return links.map((link) => (
    <Link
      key={link.path}
      href={link.path}
      onClick={onNavigate}
      aria-current={isActive(link.path) ? "page" : undefined}
      className={cn(
        "text-sm whitespace-nowrap transition-colors md:text-base",
        isActive(link.path)
          ? "text-primary-500 font-medium"
          : "text-grey-800 hover:text-black",
      )}
    >
      {link.name}
    </Link>
  ));
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
