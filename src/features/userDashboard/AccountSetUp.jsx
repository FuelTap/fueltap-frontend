import { useState } from 'react';
import { IoPersonCircleOutline, IoWarning } from 'react-icons/io5';
import { Link } from 'react-router';
import LinkBank from '../wallet/LinkBank';
const AccountSetUp = () => {
  const [bankSetup, setBankSetup] = useState(false);
  return (
    <>
      <div className="mt-10">
        <p className="text-md-medium mb-4 text-black/80!">
          Finish setting up your account
        </p>

        {/* kyc */}
        <Link className="mb-4 flex items-center justify-between rounded-[20px] bg-green-50 p-4 md:px-5 md:py-6">
          <div>
            <h3 className="font-pjs mb-3 font-semibold text-green-400 lg:text-2xl">
              KYC Verification
            </h3>
            <p className="text-grey-800 text-[14px] lg:text-[18px]">
              Upload proof of identity
            </p>
          </div>
          <IoPersonCircleOutline className="text-3xl text-green-400 lg:text-5xl" />
        </Link>
        {/* bank account */}
        <div
          className="mb-4 flex cursor-pointer items-center justify-between rounded-[20px] bg-yellow-100 p-4 md:px-5 md:py-6"
          onClick={() => setBankSetup(true)}
        >
          <div>
            <h3 className="font-pjs text-error mb-3 font-semibold lg:text-2xl">
              Bank Account Required
            </h3>
            <p className="text-grey-800 text-[14px] lg:text-[18px]">
              Link account to make transactions
            </p>
          </div>
          <IoWarning className="text-error text-3xl lg:text-5xl" />
        </div>
      </div>
      {bankSetup && <LinkBank onClose={() => setBankSetup(false)} />}
    </>
  );
};

export default AccountSetUp;
