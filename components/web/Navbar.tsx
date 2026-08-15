"use client";
import { links, PageLinks } from "@/lib/data/exports";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Bug, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
export default function Navbar() {
  //   const { isAuthenticated, user } = useSelector((store) => store.user);

  //   const name = user?.full_name;
  // ✨ Get initials dynamically

  //   const navigate = useNavigate();
  // logout
  //   const logout = useLogout;
  const [open, setOpen] = useState(false);
  return (
    <header className="flex items-center justify-between container py-2 px-3  border-b border-neutra-500">
      <Logo />

      {/* ===== Mobile Sheet (Sidebar) ===== */}
      <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
        <DrawerTrigger
          className="-order-1 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </DrawerTrigger>

        {/* h-full and w-[300px] ensures it behaves like a side panel */}
        <DrawerContent className="fixed inset-y-0 left-0 mt-0 h-full w-75 rounded-r-xl rounded-l-none pt-6 [&>button]:hidden flex flex-col">
          <DrawerHeader className="border-b pb-4">
            <div className="flex items-center justify-between gap-3">
              <DrawerClose className="rounded-md p-2 hover:bg-gray-100">
                <X size={22} />
              </DrawerClose>
              {/* <Logo /> */}

              <Avatar className="lg:hidden">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>og</AvatarFallback>
              </Avatar>
            </div>
          </DrawerHeader>

          {/* ✅ Search Input */}
          <div className="relative px-4 mt-4">
            <input
              type="text"
              tabIndex={-1}
              placeholder="Search..."
              className="focus:border-primary w-full rounded-xl border border-neutral-300 py-2.5 pr-10 pl-4 text-[15px] outline-none"
            />
            {/* <IoSearchOutline
            size={20}
            className="absolute top-1/2 right-6 -translate-y-1/2 text-neutral-500"
          /> */}
          </div>

          {/* ✅ Nav Links */}
          <div className="mt-4 flex flex-col gap-1 px-2 overflow-y-auto flex-1">
            {PageLinks.map((link) => (
              <Link
                key={link.path}
                onClick={() => setOpen(false)}
                href={link.path}
                className={`rounded-lg py-2 pl-4 text-[15px] capitalize transition-all ${
                  true
                    ? "border-primary bg-primary/10 text-primary border-l-4 font-medium"
                    : "text-neutral-700 hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ✅ Footer / Report */}
          <div className="mt-auto mb-6 flex flex-col items-center justify-center gap-4 border-t pt-4">
            <div className="flex items-center gap-2 cursor-pointer text-neutral-600 hover:text-black">
              <span>Report an issue</span>
              <Bug />
            </div>

            <div
              className="text-error flex items-center gap-2 cursor-pointer"
              //   onClick={() => logout()}
            >
              <LogOut />
              <span>Log Out</span>
            </div>
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
              true
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
        <Link
          href={"/login"}
          className={`${buttonVariants({ variant: "accent" })} h-10 w-30 rounded-3xl px-4 py-3`}
        >
          Login
        </Link>
        <Link
          className={"h-10 w-30 rounded-3xl px-4 py-3"}
          href={"/role-selector"}
        >
          Get Started
        </Link>
      </div>

      {/* ===== Small Screens Avatar ===== */}
      {
        /* !isAuthenticated */ false ? (
          //   <FaCircleUser
          //     size={28}
          //     className="md:hidden"
          //     onClick={() => navigate("/login")}
          //   />
          <div>kkd</div>
        ) : (
          <Avatar className="lg:hidden">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Og</AvatarFallback>
          </Avatar>
        )
      }
    </header>
  );
}
