import UserHeader from "@/components/user/UserHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-dvh container w-dvw flex-col">
      <UserHeader />

      <div className=" mt-1 flex-1 overflow-y-scroll pb-6 leading-[100%] tracking-tight lg:mt-4">
        {children}
      </div>
    </main>
  );
}
