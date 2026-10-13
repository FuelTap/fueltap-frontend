"use client";
import CashOverview from "@/components/user/dashboard/CashOverview";
import QuickStats from "@/components/user/dashboard/QuickStats";
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

  const kycSubmitted =
    user?.kyc.overallKycStatus.toLowerCase() !== "not submitted";

  const isVerified = (): boolean => {
    const {
      bank: { bankExists },
      wallet: { walletExists },
    } = user!;

    if (!bankExists || !walletExists || kycSubmitted) {
      return false;
    }

    return true;
  };

  const firstName = user?.profile.fullName?.split(" ")[0];
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
        {!isVerified() ? (
          <section className="flex flex-col relative md:items-start md:flex-row w-full  gap-4">
            <div className="w-full md:sticky top-18! md:basis-1/2 lg:basis-[56%] space-y-5">
              <CashOverview balance={balance} />
              <OrderFuelCard />
              <QuickStats />
            </div>

            <DashboardOptionsSection />
          </section>
        ) : (
          <AccountSetupProps
            kycDone={true} //kycSubmitted
            bankExists={user!.bank.bankExists}
            pinExists={user!.wallet.walletExists}
          />
        )}
      </div>
    </>
  );
}
