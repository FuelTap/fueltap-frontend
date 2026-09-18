"use client";
import CashOverview from "@/components/user/dashboard/CashOverview";
import QuickActions from "@/components/user/dashboard/QuickActions";
import QuickStats from "@/components/user/dashboard/QuickStats";
import UserLinks from "@/components/user/dashboard/UserLinks";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { useAuth } from "@/context/AuthProvider";
import AccountSetupProps from "./AccountSetupProps";
import OrderFuelCard from "./OrderFuelCard";
import DashboardOptionsSection from "./DashboardOptionsSection";

interface Props {
  balance: number;
}

export default function Dashboard({ balance }: Props) {
  const { user } = useAuth();
  const pinExists = false;
  const isVerified = user?.kyc && user?.bankExists && pinExists;
  const fV = false;
  const { isSmallScreen } = useScreenSize();

  const firstName = user?.full_name?.split(" ")[0];
  const { timeOfDay } = useTimeOfDay();

  return (
    <>
      <section className="">
        <h1 className="font-pjs mb-1 text-2xl font-semibold md:text-3xl">
          Good {timeOfDay || "day"} {firstName},
        </h1>
        <p className="text-accent mb-2 text-[18px] lg:text-2xl">
          How’s your day going?
        </p>
      </section>

      <div className="mt-4 flex flex-col items-start justify-between md:mt-8 md:flex-row">
        {true ? (
          <section className="flex flex-col md:flex-row w-full gap-4">
            <div className="w-full md:basis-1/2 lg:basis-[58%] space-y-5">
              <CashOverview balance={balance} />
              <OrderFuelCard />

              {isVerified && <QuickActions />}

              {!isSmallScreen && <QuickStats />}
            </div>

            <DashboardOptionsSection />
            {/* <UserLinks /> */}
          </section>
        ) : (
          <AccountSetupProps
            kycDone={user?.kyc}
            bankExists={user?.bankExists}
            pinExists={false}
          />
        )}
      </div>
    </>
  );
}
