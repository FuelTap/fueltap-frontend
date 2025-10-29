import KycForm from '@/features/kyc/KycForm';
import KycHeader from '@/features/kyc/KycHeader';

function KYC() {
  return (
    <div className="mx-auto max-w-[606px]">
      <KycHeader />
      <KycForm />
    </div>
  );
}

export default KYC;
