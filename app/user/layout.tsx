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
      <main className="flex h-dvh container w-dvw bg-neutral-400 flex-col relative animated-gradient">
        {/* <div className="fixed top-1/2 left-1/2 -translate-1/2 w-90 h-90 opacity-70  pointer-events-none rounded-full bg-linear-to-br from-[#E7F8F2] to-[#DDDEFC]  animated-gradient"></div> */}
        <header className="container md:fixed top-0 z-10 backdrop-blur-lg py-2 mx-auto w-full">
          <UserHeader />
        </header>

        <div className="flex-1 pb-6 leading-[100%] tracking-tight mt-4 md:mt-18 lg:mt-26">
          {children}
        </div>
      </main>
    </AuthProvider>
  );
}
