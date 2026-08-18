import { Button } from "@/components/ui/button";
import { useScreenSize } from "@/hooks/useScreenSize";
import { ChevronRight, Fuel, LifeBuoy, LogOut, Save } from "lucide-react";
import { Clock2 } from "@/components/animate-ui/icons/clock-2";
import { UserRound } from "@/components/animate-ui/icons/user-round";
import { Settings } from "@/components/animate-ui/icons/settings";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

const links = [
  {
    title: "Order History",
    to: "/user/orders",
    icon: <Fuel size={44} />,
  },
  {
    title: "Transation History",
    to: "/user/transaction-history",
    icon: <Clock2 size={44} />,
  },
  {
    title: "Personal Details",
    to: "",
    icon: <UserRound size={44} />,
  },
  {
    title: "Account Settings",
    to: "/user/account-settings",
    icon: <Settings size={44} />,
  },
  {
    title: "Update Bank Account",
    to: "",
    icon: <Save size={44} />,
  },
  {
    title: "Help & Support",
    to: "/support",
    icon: <LifeBuoy size={44} />,
  },
  {
    title: "Log Out",

    icon: <LogOut size={44} />,
  },
];
const UserLinks = () => {
  const { logout } = useAuth();
  const { isSmallScreen } = useScreenSize();
  const linksToUse = isSmallScreen
    ? links.filter((_, index) => index !== 0 && index !== 5)
    : links;

  return (
    <div className="w-full md:max-w-[47%]">
      {linksToUse.map(({ icon, to, title }, index) => (
        <div key={index}>
          {title === "Log Out" ? (
            <div
              className="border-neutra-500 group flex cursor-pointer items-center justify-between border-b p-2 transition md:px-4 md:py-5"
              key={index}
              onClick={() => logout()}
            >
              <div className="flex items-center gap-3">
                <Button
                  className={
                    "bg-red-100/90 p-2 text-red-400/90 group-hover:bg-red-200 group-hover:text-red-400"
                  }
                  variant={"icon"}
                  size={"icon"}
                >
                  {icon}
                </Button>
                <p className="text-neutra-1000 font-normal lg:text-xl">
                  {title}
                </p>
              </div>
              <ChevronRight
                size={20}
                className="transform transition-transform duration-300 group-hover:translate-x-2"
              />
            </div>
          ) : (
            <Link
              className="border-neutra-500 group flex items-center justify-between border-b p-2 transition md:px-4 md:py-5"
              href={to || ""}
              key={index}
            >
              <div className="flex items-center gap-3">
                <Button
                  className={
                    "bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-100 group-hover:text-green-400"
                  }
                  variant={"icon"}
                  size={"icon"}
                >
                  {icon}
                </Button>
                <p className="text-neutra-1000 font-normal lg:text-xl">
                  {title}
                </p>
              </div>
              <ChevronRight
                size={20}
                className="transform transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserLinks;
