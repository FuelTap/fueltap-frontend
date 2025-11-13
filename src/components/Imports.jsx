import { HiMiniUsers } from 'react-icons/hi2';
import { MdOutlinePersonOutline } from 'react-icons/md';

export const logoImg = '/assets/images/FuelTap-Logo.png';
export const kycImage = '/assets/images/kyc-image.png';
export const filemage = '/assets/images/file.png';
export const warn = '/assets/images/warn.png';

export // ✨ Array of link objects
const links = [
  { name: 'Home', path: '/user' },
  { name: 'Orders', path: '/user/orders' },
  { name: 'Price Display', path: '/user/prices' },
  { name: 'Wallet', path: '/user/wallet' },
  { name: 'Support', path: '/user/support' },
];

export const PageLinks = [
  { name: 'Home', path: '/' },
  { name: 'Orders', path: '/user/orders' },
  { name: 'Price Display', path: '/user/prices' },
  { name: 'Account', path: '/user' },
  { name: 'Contact us', path: '/contact-us' },
];
export const orderOptions = [
  {
    icon: <MdOutlinePersonOutline size={18} />,
    label: 'for you',
    key: 'personal',
  },
  {
    icon: <HiMiniUsers />,
    label: 'for a friend',
    key: 'others',
  },
];

// fuel type

export const fuelType = [
  {
    text: 'Petrol',
  },
  {
    text: 'Diesel',
  },
  {
    text: 'LPG',
  },
];

export const fuelLiters = [
  { text: 10 },
  { text: 20 },
  { text: 50 },
  { text: 100 },
];

// weeks
export const weeks = [
  {
    day: 'Monday',
    label: 'M',
  },
  {
    day: 'Tuesday',
    label: 'T',
  },
  {
    day: 'Wednesday',
    label: 'W',
  },
  {
    day: 'Thursday',
    label: 'T',
  },
  {
    day: 'Friday',
    label: 'F',
  },
  {
    day: 'Saturday',
    label: 'S',
  },
  {
    day: 'Sunday',
    label: 'S',
  },
];
