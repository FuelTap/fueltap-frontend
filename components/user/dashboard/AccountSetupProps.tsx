import {
  LockKeyhole,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Landmark,
  KeyRound,
} from "lucide-react";
import AccountSetupProgress from "./AccountSetupProgress";
import Link from "next/link";
import { Check } from "@/components/animate-ui/icons/check";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

const getVerificationSteps = (
  bankExists: boolean,
  kycDone: boolean,
  pinExists: boolean,
) => [
  {
    type: "email",
    header: "Verify your email",
    subText: "Your email has been verified",
    isCompleted: true,
    lockedReason: undefined,
    icon: <Mail className="text-green-500" />,
    actionLink: "/user/verify-email",
    actionText: "Verify Email",
  },
  {
    type: "kyc",
    header: "Verify your identity (Kyc temporarily set to true)",
    subText: "Complete KYC to secure your account.",
    isCompleted: true, // kycDone,
    lockedReason: undefined,
    icon: <ShieldCheck className="text-green-500" />,
    actionLink: "/user/kyc",
    actionText: "Complete KYC",
  },
  {
    type: "bank",
    header: "Link your bank account",
    subText: "Connect your bank to fund your wallet.",
    isCompleted: bankExists,
    lockedReason: !kycDone ? "Complete KYC first." : undefined,
    icon: <Landmark className="text-green-500" />,
    actionLink: "/user/link-bank",
    actionText: "Link Bank",
  },
  {
    type: "pin",
    header: "Set your transaction PIN",
    subText: "Create a 4-digit PIN to securely approve wallet.",
    isCompleted: pinExists,
    lockedReason: !kycDone
      ? "Complete KYC first."
      : !bankExists
        ? "Link your bank account first."
        : undefined,
    icon: <KeyRound className="text-green-500" />,
    actionLink: "/user/set-pin",
    actionText: "Set PIN",
  },
];

// 2. Extracted Clean Sub-component
interface SetupCardProps {
  header: string;
  subText: string;
  isCompleted: boolean;
  lockedReason?: string;
  icon: React.ReactNode;
  actionLink: string;
  actionText: string;
}

const SetupCard = ({
  header,
  subText,
  isCompleted,
  lockedReason,
  icon,
  actionLink,
  actionText,
}: SetupCardProps) => {
  const isLocked = !isCompleted && Boolean(lockedReason);

  return (
    <div
      className={`rounded-2xl mb-4 border-2 p-4 flex items-center justify-between transition-colors ${
        isCompleted
          ? "bg-neutral-400 border-neutral-400/20"
          : "bg-green-50 border-green-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="bg-white p-2.5 rounded-xl shadow-xs flex items-center justify-center">
          {icon}
        </span>
        <div className={isCompleted ? "line-through opacity-70" : ""}>
          <h4 className="font-semibold text-base lg:text-lg mb-1.5 text-neutral-900">
            {header}
          </h4>
          <p className="text-xs text-neutral-600">{subText}</p>
        </div>
      </div>

      {isCompleted ? (
        <AnimateIcon animateOnView>
          <Check className="bg-green-500 text-white size-10 rounded-full p-2" />
        </AnimateIcon>
      ) : isLocked ? (
        <button
          type="button"
          disabled
          aria-label={`${actionText}: ${lockedReason}`}
          className="p-4 bg-neutral-200 border border-neutral-300 max-w-[158px] rounded-full justify-center md:rounded-[999px] flex gap-2 text-sm text-neutral-500 items-center cursor-not-allowed"
        >
          <span className="hidden lg:inline">{actionText}</span>
          <LockKeyhole className=" md:hidden size-4" aria-hidden="true" />
        </button>
      ) : (
        <Link
          href={actionLink}
          aria-label={actionText}
          className="p-4 bg-white border max-w-[158px] rounded-full justify-center md:rounded-[999px] flex gap-2 text-sm border-[#DCDDDD] text-black items-center shadow-xs hover:bg-neutral-50 transition-all"
        >
          <span className="hidden lg:inline">{actionText}</span>
          <ArrowUpRight className="size-4" />
        </Link>
      )}
    </div>
  );
};

// 3. Main Component
const AccountSetupProps = ({
  bankExists,
  kycDone,
  pinExists,
}: {
  bankExists: boolean;
  kycDone: boolean;
  pinExists: boolean;
}) => {
  const steps = getVerificationSteps(bankExists, kycDone, pinExists);

  return (
    <section className="basis-1/2">
      <AccountSetupProgress
        bankExists={bankExists}
        kycDone={kycDone}
        pinExists={pinExists}
      />

      <div className="mt-5">
        {steps.map((step) => (
          <SetupCard
            key={step.type}
            header={step.header}
            subText={step.subText}
            isCompleted={step.isCompleted}
            lockedReason={step.lockedReason}
            icon={step.icon}
            actionLink={step.actionLink}
            actionText={step.actionText}
          />
        ))}
      </div>
    </section>
  );
};

export default AccountSetupProps;
