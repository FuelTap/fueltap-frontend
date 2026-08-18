"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import FundWallet from "../wallet/FundWallet";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Eye, EyeClosed, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/helpers/help";

interface Props {
  balance: number;
}

export default function CashOverview({ balance }: Props) {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showFunds, setShowFunds] = useState(false);

  //   const { data: walletBalance, error, isLoading } = useBalance();

  const error = "dld";
  const isLoading = false;

  // FIX: amount should NOT depend on async state initially
  const [amount, setAmount] = useState(0);

  // FIX: update amount when balance arrives
  useEffect(() => {
    if (balance !== undefined) {
      setAmount(balance);
    }
  }, [balance]);

  const router = useRouter();

  return (
    <>
      <div className="bg-primary px-4 py-5 lg:rounded-[20px] lg:px-7 lg:py-10">
        {/* Buttons */}
        <div className="mb-6 flex items-center justify-between lg:mb-8">
          <Button
            onClick={() => setShowAddFunds(true)}
            size="sm"
            className="text-primary rounded-xl bg-white hover:bg-white/85 max-sm:text-[12px] md:rounded-2xl"
          >
            <Plus /> <span>Add Funds</span>
          </Button>

          <Link
            href="/user/transaction-history"
            className={`${buttonVariants({ variant: "ghost", size: "sm" })} group  rounded-xl max-sm:text-[12px] `}
          >
            View history
            <ChevronRight className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Balance */}
        <div className="flex items-center justify-between text-white">
          <div className="flex flex-col gap-1">
            <p className="text-lg-medium">Wallet Balance</p>

            {isLoading ? (
              <Skeleton className="bg-muted h-12 w-12" />
            ) : (
              <h3 className="font-pjs text-3xl font-bold lg:text-5xl">
                {showFunds
                  ? formatCurrency(amount)
                  : "*".repeat(String(amount).length)}
              </h3>
            )}
          </div>

          {showFunds ? (
            <EyeClosed
              onClick={() => setShowFunds(false)}
              className="cursor-pointer text-xl"
            />
          ) : (
            <Eye
              onClick={() => setShowFunds(true)}
              className="cursor-pointer text-xl"
            />
          )}
        </div>
      </div>

      {showAddFunds && <FundWallet onClose={() => setShowAddFunds(false)} />}
    </>
  );
}
