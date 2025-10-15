import { Outlet } from 'react-router';
import UserHeader from '@/components/UserHeader';

const User = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col">
      <UserHeader />
      <main className="container flex-1 overflow-y-scroll pb-6 leading-[100%] tracking-tight">
        <Outlet />
      </main>
    </div>
  );
};

export default User;
