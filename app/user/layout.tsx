import UserHeader from "@/components/user/UserHeader";
import { AuthProvider, User } from "@/context/AuthProvider";
import { getUserProfile } from "@/lib/server/auth";
import { redirect } from "next/navigation";
export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialUser: User | null = null;

  const { success, data } = await getUserProfile();

  if (success && data?.user) {
    initialUser = data.user;
  }

  if (!initialUser) {
    redirect("/login");
  }

  console.log(initialUser);
  return (
    <AuthProvider initialUser={initialUser}>
      <div className="relative isolate min-h-dvh bg-neutral-400">
        <UserHeader />
        <main className="container relative flex min-h-dvh flex-col">
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-20 bottom-0 -z-10 bg-[url('/images/user-background-gradient.svg')] bg-center bg-no-repeat"
            style={{
              backgroundSize: "min(600px, 90vw, calc(100dvh - 5rem)) auto",
            }}
          />
          <div className="mt-4 flex-1 pb-6 leading-[100%] tracking-tight md:mt-18 lg:mt-26">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
