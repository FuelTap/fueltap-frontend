import {
  Progress,
  ProgressTrack,
} from "@/components/animate-ui/components/base/progress";

interface AccountSetupProgressProps {
  bankExists: boolean;
  kycDone: boolean;
  pinExists: boolean;
}

const AccountSetupProgress = ({
  bankExists,
  kycDone,
  pinExists,
}: AccountSetupProgressProps) => {
  const completedCount =
    1 + (kycDone ? 1 : 0) + (bankExists ? 1 : 0) + (pinExists ? 1 : 0);

  const progressPercentage = completedCount * 25;

  const stepsRemaining = 4 - completedCount;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-base md:text-lg font-semibold lg:text-xl mb-2">
          Complete your account setup
        </h3>
        <p className="text-sm lg:text-base font-medium text-neutral-600">
          {stepsRemaining === 0
            ? "Your account setup is fully complete! You're ready to go."
            : `Finish the remaining ${stepsRemaining} step${stepsRemaining > 1 ? "s" : ""} to start ordering fuel and using your wallet.`}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <Progress className="w-full" value={progressPercentage}>
            <ProgressTrack className="bg-yellow-100" />
          </Progress>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <small className="font-semibold text-sm">{completedCount}/4</small>
            <small className="text-sm text-neutral-500">Completed</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSetupProgress;
