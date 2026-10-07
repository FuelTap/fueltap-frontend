"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutModal from "./LogoutModal";

const accountSettingsLink = [
  {
    text: "Profile",
    href: "",
  },
  {
    text: "Security",
    href: "/security",
  },
  {
    text: "Preferences",
    href: "/preferences",
  },
  {
    text: "Help & Support",
    href: "/help",
  },
];
const SettingsNav = () => {
  const pathName = usePathname();

  return (
    <nav className="mt-4  flex items-center justify-between  ">
      <ul className="bg-primary-50 rounded-[999px] border border-primary-100 p-1 flex items-center gap-1 md:gap-2 overflow-x-auto max-sm:max-w-full max-sm:whitespace-nowrap no-scrollbar">
        {accountSettingsLink.map(({ text, href }, index) => {
          const fullPath = `/user/account-settings${href}`;
          const isActive = pathName === fullPath;

          return (
            <li
              key={index}
              className={`${
                isActive
                  ? "text-primary-500 bg-white border-primary-500 shadow-sm"
                  : "text-primary-400 bg-transparent border-transparent hover:text-primary-500"
              } font-medium text-base border-b cursor-pointer rounded-[999px] px-4 py-2 ease-in-out duration-200 transition-all`}
            >
              <Link href={fullPath} className="cursor-pointer">
                {text}
              </Link>
            </li>
          );
        })}
      </ul>

      <LogoutModal>
        <Button
          variant={"outline"}
          className={
            "rounded-[999px] hidden md:inline-flex text-primary hover:text-white hover:bg-destructive items-center gap-2"
          }
        >
          <LogOut /> <span>Log Out</span>{" "}
        </Button>
      </LogoutModal>
    </nav>
  );
};

export default SettingsNav;
