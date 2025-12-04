import Alert from '@/components/Alert';
import { warn } from '@/components/Imports';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import AccountSetUp from '@/features/userDashboard/AccountSetUp';
import CashOverview from '@/features/userDashboard/CashOverview';
import QuickActions from '@/features/userDashboard/QuickActions';
import QuickStats from '@/features/userDashboard/QuickStats';
import UserLinks from '@/features/userDashboard/UserLinks';
import { useScreenSize } from '@/hooks/useScreenSize';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const isVerified = user.kyc && user.bankExists;

  const { isSmallScreen } = useScreenSize();

  const firstName = user?.full_name?.split(' ')[0];
  const [timeOfDay, setTimeOfDay] = useState('');

  const updateTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('Morning');
    } else if (hour < 17) {
      setTimeOfDay('Afternoon');
    } else {
      setTimeOfDay('Evening');
    }
  };

  useEffect(() => {
    updateTimeOfDay(); // run once when the component loads

    // check again every minute (60000 milliseconds)
    const interval = setInterval(updateTimeOfDay, 60000);

    // cleanup when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // const [showCancelAlert, setShowCancelAlert] = useState(false);

  return (
    <>
      {/* <Alert open={showCancelAlert} onClose={() => setShowCancelAlert(false)}>
        <CancelOrder onClose={() => setShowCancelAlert(false)} />
      </Alert> */}
      <div className="">
        <h1 className="font-pjs mb-2 text-2xl font-semibold md:text-3xl lg:text-5xl">
          Good {timeOfDay} {firstName},
        </h1>
        <p className="text-accent mb-2 text-[18px] lg:text-2xl">
          How’s your day going?
        </p>
      </div>
      {/* <button onClick={() => setShowCancelAlert(true)}>Cancel order</button> */}

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
