import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { BsEye, BsEyeSlash, BsPlus } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';
import FundWallet from '../wallet/FundWallet';
import { useNavigate } from 'react-router';
import { formatCurrency } from '@/utils/helpers';
import useBalance from '@/hooks/useBalance';
import { Skeleton } from '@/components/ui/skeleton';

function CashOverview() {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showFunds, setShowFunds] = useState(false);

  const { data: walletBalance, error, isLoading } = useBalance();

  const balance = walletBalance?.data?.balance;

  // FIX: amount should NOT depend on async state initially
  const [amount, setAmount] = useState(0);

  // FIX: update amount when balance arrives
  useEffect(() => {
    if (balance !== undefined) {
      setAmount(balance);
    }
  }, [balance]);

  const navigate = useNavigate();

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
            <BsPlus /> <span>Add Funds</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate('transaction-history')}
            className="rounded-xl max-sm:text-[12px]"
          >
            <span>View history</span>
            <FiArrowRight />
          </Button>
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
                  : '*'.repeat(String(amount).length)}
              </h3>
            )}
          </div>

          {showFunds ? (
            <BsEyeSlash
              onClick={() => setShowFunds(false)}
              className="cursor-pointer text-xl"
            />
          ) : (
            <BsEye
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

export default CashOverview;
