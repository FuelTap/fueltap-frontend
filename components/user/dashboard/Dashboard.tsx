"use client";
import AccountSetUp from "@/components/user/dashboard/AccountSetUp";
import CashOverview from "@/components/user/dashboard/CashOverview";
import QuickActions from "@/components/user/dashboard/QuickActions";
import QuickStats from "@/components/user/dashboard/QuickStats";
import UserLinks from "@/components/user/dashboard/UserLinks";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
import { useAuth } from "@/context/AuthProvider";

interface Props {
  balance: number;
}

export default function Dashboard({ balance }: Props) {
  const { user } = useAuth();
  //   const { user } = useSelector((state) => state.user);
  const isVerified = user?.kyc && user?.bankExists;

  const { isSmallScreen } = useScreenSize();

  const firstName = user?.full_name?.split(" ")[0];
  const { timeOfDay } = useTimeOfDay();
  // const [showCancelAlert, setShowCancelAlert] = useState(false);

  return (
    <>
      {/* <Alert open={showCancelAlert} onClose={() => setShowCancelAlert(false)}>
        <CancelOrder onClose={() => setShowCancelAlert(false)} />
      </Alert> */}
      <div className="">
        <h1 className="font-pjs mb-2 text-2xl font-semibold md:text-3xl lg:text-5xl">
          Good {timeOfDay || "day"} {firstName},
        </h1>
        <p className="text-accent mb-2 text-[18px] lg:text-2xl">
          How’s your day going?
        </p>
      </div>
      {/* <button onClick={() => setShowCancelAlert(true)}>Cancel order</button> */}

      <div className="mt-4 flex flex-col items-start justify-between md:mt-8 md:flex-row">
        {/* money overview */}
        <div className="w-full md:max-w-[47%]">
          <CashOverview balance={balance} />

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
}

// function CancelOrder({ onClose }) {
//   return (
//     <div className="flex flex-col items-center justify-center gap-8 text-center">
//       <img src={warn} alt="cancel order!" />
//       <div>
//         <h3 className="mb-2 text-xl">Cancel Order</h3>
//         <p>Are you sure you want to cancel your order</p>
//       </div>

//       <Button
//         className={'text-error hover:bg-error bg-red-100 hover:text-white'}
//         onClick={onClose}
//       >
//         Cancel Order
//       </Button>
//     </div>
//   );
// }
