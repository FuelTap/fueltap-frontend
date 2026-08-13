import UserHeader from "@/components/user/UserHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-dvh container w-dvw flex-col">
      <header className="container fixed top-0 z-10 backdrop-blur-lg py-2 mx-auto w-full">
        <UserHeader />
      </header>

      <div className="mt-1 flex-1 pb-6 leading-[100%] tracking-tight lg:mt-26">
        {children}
      </div>
    </main>
  );
}
