"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import FundWallet from "../wallet/FundWallet";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Eye, EyeClosed, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/helpers/help";

interface Props {
  balance: number;
}

export default function CashOverview({ balance }: Props) {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showFunds, setShowFunds] = useState(false);

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
      <div className="bg-neutral-400 border border-grey-200 p-4 lg:rounded-[20px] md:px-7.5 md:py-5 flex flex-col justify-center h-39.75">
        {/* Balance */}
        <div className="flex items-center justify-between mb-7.5 md:mb-10 ">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-grey-800">Wallet Balance</p>

            {isLoading ? (
              <Skeleton className="bg-muted h-12 w-12" />
            ) : (
              <h3 className="font-pjs text-base text-black font-semibold md:text-lg">
                {showFunds ? formatCurrency(amount) : "*".repeat(5)}
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
        <div className=" flex items-center justify-between ">
          <Button
            onClick={() => setShowAddFunds(true)}
            size="sm"
            className="text-primary group  bg-yellow-500 hover:bg-yellow-500/85 rounded-[999px] max-sm:text-[12px] p-4!"
          >
            <span>Funds Wallet</span>
            <ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>

          <Link
            href="/user/transaction-history"
            className={`${buttonVariants({ variant: "link", size: "sm" })}   text-sm  p-0!`}
          >
            View Transaction History
          </Link>
        </div>
      </div>

      {showAddFunds && <FundWallet onClose={() => setShowAddFunds(false)} />}
    </>
  );
}
