import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BsEye, BsEyeSlash, BsPlus } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';
import FundWallet from '../wallet/FundWallet';
import { useNavigate } from 'react-router';
import { formatCurrency } from '@/utils/helpers';

function CashOverview() {
  const [showAddFunds, setShowAddFunds] = useState(false);
  // render **** or amount
  const [showFunds, setShowFunds] = useState(true);

  const [amount, setAmount] = useState(10000);
  const amountDislay = showFunds
    ? amount
    : String(amount)
        .split('')
        .map((_, index) => '*')
        .join('');

  const navigate = useNavigate();
  return (
    <>
      <div className="bg-primary lg: rounded-[20px] px-4 py-5 lg:px-7 lg:py-10">
        <div className="mb-6 flex items-center justify-between lg:mb-8">
          <Button
            onClick={() => setShowAddFunds(true)}
            size={'sm'}
            className={
              'text-primary rounded-xl bg-white hover:bg-white/85 max-sm:text-[12px] md:rounded-2xl'
            }
          >
            <BsPlus /> <span>Add Funds </span>{' '}
          </Button>

          <Button
            size={'sm'}
            variant={'ghost'}
            onClick={() => navigate('transaction-history')}
            className={'md:rounded-2x rounded-xl max-sm:text-[12px]'}
          >
            <span>View history </span>
            <FiArrowRight />
          </Button>
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="md:gap2 flex flex-col gap-1">
            <p className="text-lg-medium">Wallet Balance</p>
            <h3 className="font-pjs text-3xl font-bold lg:text-5xl">
              {showFunds
                ? formatCurrency(amount)
                : '*'.repeat(String(amount).length)}
            </h3>
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
