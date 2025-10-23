import { FaBars, FaBug, FaX } from 'react-icons/fa6';
import Header from './Header';
import Logo from './Logo';
import { NavLink, useNavigate } from 'react-router';
import { IoNotificationsOutline, IoSearchOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';

import { IoMdClose } from 'react-icons/io';
import { FaCircleUser } from 'react-icons/fa6';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { links, PageLinks } from './Imports';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { splitName } from '@/utils/helpers';
import useLogout from '@/hooks/useLogout';

const UserHeader = () => {
  const { user, isAuthenticated } = useSelector((store) => store.user);

  const name = user?.full_name;
  // ✨ Get initials dynamically
  const initials = splitName?.(name);

  // logout
  const logout = useLogout();
  return (
    <Header center={false}>
      <Logo />

      {/* ===== Mobile Sheet (Sidebar) ===== */}
      <Sheet>
        <SheetTrigger className="-order-1 lg:hidden">
          <FaBars size={22} />
        </SheetTrigger>

        <SheetContent side="left" className="pt-6">
          <SheetHeader className="border-b pb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h5 className="text-[15px] font-medium text-black capitalize">
                  {name}
                </h5>
                <p className="text-sm text-neutral-500">Premium member</p>
              </div>
            </div>
          </SheetHeader>

          {/* ✅ Search Input */}
          <div className="relative px-1">
            <input
              type="text"
              tabIndex={-1}
              placeholder="Search..."
              className="focus:border-primary w-full rounded-xl border border-neutral-300 py-2.5 pr-10 pl-4 text-[15px] outline-none"
            />
            <IoSearchOutline
              size={20}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
            />
          </div>

          {/* ✅ Nav Links */}
          <div className="mt-2 flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-lg py-2 pl-4 text-[15px] capitalize transition-all ${
                    isActive
                      ? 'border-primary bg-primary/10 text-primary border-l-4 font-medium'
                      : 'text-neutral-700 hover:text-black'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* report */}
          <div className="mt-auto mb-4 flex flex-col items-center justify-center justify-self-end">
            <div className="flex items-center gap-2">
              <span>Report an issue</span>
              <FaBug />
            </div>

            {isAuthenticated && (
              <div className="text-error flex items-center gap-2">
                <MdLogout onClick={() => logout()} />
                <span>Log Out</span>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* ===== Desktop Links ===== */}
      <nav className="hidden items-center gap-8 lg:flex">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? 'text-lg-medium text-black transition-all'
                : 'text-lg-regular text-neutral-700 transition-all hover:text-black'
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* ===== Right Section (Desktop) ===== */}
      <div className="hidden items-center gap-6 lg:flex">
        <IoSearchOutline
          size={21}
          className="cursor-pointer text-neutral-700"
        />
        <IoNotificationsOutline
          size={21}
          className="cursor-pointer text-neutral-700"
        />
        <div className="flex items-center gap-2">
          <div>
            <h5 className="text-[14px] text-black capitalize">{name}</h5>
            <h5 className="text-[14px] text-neutral-900 capitalize">
              Premium member
            </h5>
          </div>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* ===== Small Screens Avatar ===== */}
      <Avatar className="lg:hidden">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Header>
  );
};

export default UserHeader;

export function HomeHeader() {
  const { isAuthenticated, user } = useSelector((store) => store.user);

  const name = user?.full_name;
  // ✨ Get initials dynamically

  const navigate = useNavigate();
  // logout
  const logout = useLogout;
  return (
    <Header center={false}>
      <Logo />

      {/* ===== Mobile Sheet (Sidebar) ===== */}
      <Sheet>
        <SheetTrigger className="-order-1 lg:hidden">
          <FaBars size={22} />
        </SheetTrigger>

        <SheetContent side="left" className="pt-6 [&>button]:hidden">
          <SheetHeader className="border-b pb-4">
            <div className="flex items-center justify-between gap-3">
              <SheetClose asChild>
                <button className="rounded-md p-2 hover:bg-gray-100">
                  <IoMdClose size={22} />
                </button>
              </SheetClose>
              <Logo />
              {!isAuthenticated ? (
                <FaCircleUser size={28} onClick={() => navigate('/login')} />
              ) : (
                <Avatar className="lg:hidden" onClick={() => navigate('/user')}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{splitName(name)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </SheetHeader>

          {/* ✅ Search Input */}
          <div className="relative px-1">
            <input
              type="text"
              tabIndex={-1}
              placeholder="Search..."
              className="focus:border-primary w-full rounded-xl border border-neutral-300 py-2.5 pr-10 pl-4 text-[15px] outline-none"
            />
            <IoSearchOutline
              size={20}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
            />
          </div>

          {/* ✅ Nav Links */}
          <div className="mt-2 flex flex-col gap-1">
            {PageLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-lg py-2 pl-4 text-[15px] capitalize transition-all ${
                    isActive
                      ? 'border-primary bg-primary/10 text-primary border-l-4 font-medium'
                      : 'text-neutral-700 hover:text-black'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* report */}
          <div className="mt-auto mb-4 flex flex-col items-center justify-center justify-self-end">
            <div className="flex items-center gap-2">
              <span>Report an issue</span>
              <FaBug />
            </div>

            {isAuthenticated && (
              <div className="text-error flex items-center gap-2">
                <MdLogout onClick={() => logout()} />
                <span>Log Out</span>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* ===== Desktop Links ===== */}
      <nav className="hidden items-center gap-8 lg:flex">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? 'text-lg-medium text-black transition-all'
                : 'text-lg-regular text-neutral-700 transition-all hover:text-black'
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* ===== Right Section (Desktop) ===== */}
      <div className="hidden items-center gap-6 lg:flex">
        <Button
          variant={'accent'}
          className={'h-[40px] w-[120px] rounded-3xl px-4 py-3'}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button
          className={'h-[40px] w-[120px] rounded-3xl px-4 py-3'}
          onClick={() => navigate('/role-selector')}
        >
          Get Started
        </Button>
      </div>

      {/* ===== Small Screens Avatar ===== */}
      {!isAuthenticated ? (
        <FaCircleUser
          size={28}
          className="md:hidden"
          onClick={() => navigate('/login')}
        />
      ) : (
        <Avatar className="lg:hidden" onClick={() => navigate('/user')}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{splitName(name)}</AvatarFallback>
        </Avatar>
      )}
    </Header>
  );
}
