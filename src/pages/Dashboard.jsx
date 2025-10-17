import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import AccountSetUp from '@/features/userDashboard/AccountSetUp';
import CashOverview from '@/features/userDashboard/CashOverview';
import QuickActions from '@/features/userDashboard/QuickActions';
import QuickStats from '@/features/userDashboard/QuickStats';
import UserLinks from '@/features/userDashboard/UserLinks';
import { useScreenSize } from '@/hooks/useScreenSize';
import React from 'react';
import { BsEye, BsPlus } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';

const Dashboard = () => {
  const isVerified = false;

  const { isSmallScreen } = useScreenSize();
  return (
    <>
      <div className="">
        <h1 className="font-pjs mb-2 text-2xl font-semibold md:text-3xl lg:text-5xl">
          Good afternoon Jola,
        </h1>
        <p className="text-accent mb-2 text-[18px] lg:text-2xl">
          How’s your day going?
        </p>
      </div>
      <div className="mt-4 flex flex-col items-start justify-between md:mt-8 md:flex-row">
        {/* money overview */}
        <div className="w-full md:max-w-[47%]">
          <CashOverview />

          {/* show quick actions when kyc is verified */}
          {isVerified && <QuickActions />}
          {/* Quick stats */}
          {!isSmallScreen && <QuickStats />}

          {/*show  Finish account setup if kyc is unverified */}

          {!isVerified && <AccountSetUp />}
        </div>
        {/* other section */}
        <UserLinks />
      </div>
    </>
  );
};

export default Dashboard;
