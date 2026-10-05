import KycForm from "@/components/user/kyc/KycForm";
import KycHeader from "@/components/user/kyc/KycHeader";

export default function KYCPage() {
  return (
    <section className="mx-auto p-8 rounded-2xl max-w-142 bg-neutral-400 border border-gray-100">
      <KycHeader />
      <KycForm />
    </section>
  );
}
