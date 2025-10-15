import { RiArrowRightSLine } from 'react-icons/ri';
import { LuFuel } from 'react-icons/lu';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { useScreenSize } from '@/hooks/useScreenSize';

const links = [
  {
    title: 'Order History',
    to: '',
    icon: <LuFuel size={44} />,
  },
  {
    title: 'Transation History',
    to: '',
    icon: <LuFuel size={44} />,
  },
  {
    title: 'Personal Details',
    to: '',
    icon: <LuFuel size={44} />,
  },
  {
    title: 'Account Settings',
    to: '',
    icon: <LuFuel size={44} />,
  },
  {
    title: 'Update Bank Account',
    to: '',
    icon: <LuFuel size={44} />,
  },
  {
    title: 'Help & Support',
    to: '',
    icon: <LuFuel size={44} />,
  },
  {
    title: 'Log Out',
    to: '',
    icon: <LuFuel size={44} />,
  },
];
const UserLinks = () => {
  const { isSmallScreen } = useScreenSize();
  const linksToUse = isSmallScreen
    ? links.filter((_, index) => index !== 0 && index !== 5)
    : links;
  return (
    <div className="w-full md:max-w-[47%]">
      {linksToUse.map(({ icon, to, title }, index) => (
        <Link
          className="border-neutra-500 group flex items-center justify-between border-b p-2 transition md:px-4 md:py-5"
          key={index}
        >
          <div className="flex items-center gap-3">
            <Button
              className={
                'bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-100 group-hover:text-green-400'
              }
              variant={'icon'}
              size={'icon'}
            >
              {icon}
            </Button>
            <p className="text-neutra-1000 font-[400] lg:text-xl">{title}</p>
          </div>
          <RiArrowRightSLine
            size={20}
            className="transform transition-transform duration-300 group-hover:translate-x-2"
          />
        </Link>
      ))}
    </div>
  );
};

export default UserLinks;
