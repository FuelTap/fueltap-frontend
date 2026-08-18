import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/components/web/Logo";
import OnboardingShell from "../../components/auth/onboardingShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-screen justify-between overflow-hidden">
      <div className="mx-auto flex w-screen max-w-lg basis-full flex-col items-center sm:basis-1/2 lg:max-w-180">
        <Logo />

        <div className="mx-auto mt-4 w-[95%] max-sm:h-[75%] md:mt-8 lg:max-w-140">
          <OnboardingShell />

          {children}
        </div>
      </div>

      <Skeleton className="bg-neutra-600 hidden h-full w-1/2 border-2 md:block" />
    </main>
  );
}
