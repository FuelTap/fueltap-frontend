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

  return (
    <AuthProvider initialUser={initialUser}>
      <main className="flex h-dvh container w-dvw flex-col">
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
