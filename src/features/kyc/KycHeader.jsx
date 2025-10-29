import { kycImage } from '@/components/Imports';

const KycHeader = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:text-center">
      <img src={kycImage} className="max-sm:h-19 max-sm:w-30" alt="kyc image" />
      <h2 className="text-primary text-2xl font-semibold max-sm:self-start md:text-3xl">
        Verify Your Identity
      </h2>
      <p className="text-lg-regular leading-6">
        To ensure the security of your account and comply with regulatory
        requirements, we need to verify your identity. You will be done in{' '}
        <span className="font-semibold text-black">5 mins. </span>
      </p>
    </div>
  );
};

export default KycHeader;
