// import { formSchema } from '@/features/register/formsSchemas';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';

// import { useSelector } from 'react-redux';
import { GoClock } from 'react-icons/go';
import { IoKeyOutline, IoShieldOutline } from 'react-icons/io5';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa6';
import AccountHeader from '@/features/accountSettings/AccountHeader';
import ProfileSettings from '@/features/accountSettings/ProfileSettings';
import Jsx from '@/features/accountSettings/Jsx';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ChangePassword from '@/features/accountSettings/ChangePassword';

const AccountSettings = () => {
  // const { user } = useSelector((store) => store.user);

  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     fullName: user.full_name,
  //     phone: user.phone_number,
  //   },
  // });

  return (
    <div>
      <AccountHeader />

      <ProfileSettings />

      {/* setting options for mobiles */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible>
          {[
            {
              icon: <FaRegClock />,
              title: 'Change  Password',
              jsx: <ChangePassword />,
            },
            {
              icon: <FaRegClock />,
              title: 'Add Transaction Pin',
              jsx: <Jsx />,
            },
          ].map(({ title, icon, jsx }, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={index + 1}
              className={'last:border-b-1'}
            >
              <AccordionTrigger className={''}>
                <div
                  className={
                    'text-md-medium text-grey-800! flex items-center gap-2'
                  }
                >
                  <span
                    className={
                      'flex h-8 w-8 items-center justify-center rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400'
                    }
                  >
                    {icon}
                  </span>
                  {title}
                </div>
              </AccordionTrigger>
              <AccordionContent className={'text-md-medium text-neutra-1000'}>
                {jsx}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex items-center gap-2 py-4">
          <span
            className={
              'flex h-8 w-8 items-center justify-center rounded-full bg-red-100/90 p-2 text-red-400/90 group-hover:bg-red-200 group-hover:text-red-400'
            }
          >
            <RiDeleteBin5Line />
          </span>
          <p className="text-md-medium text-error!">Delete Account</p>
        </div>
      </div>

      {/* <span
                className={
                  'flex h-12 w-12 items-center justify-center rounded-full bg-red-100/90 p-2 text-red-400/90 group-hover:bg-red-200 group-hover:text-red-400'
                }
              >
                <RiDeleteBin5Line />
              </span> */}

      <div className="hidden flex-col justify-between md:flex-row lg:flex">
        <div className="basis-full p-8 md:basis-[49%]">
          <div className="mb-6 space-y-0.5">
            <h4 className="title">Security Settings</h4>
            <p className="text-lg-regular text-lg text-gray-800">
              Manage your password, PIN, and security preferences
            </p>
            <div className="mt-4 flex flex-col gap-8 p-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      'rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400'
                    }
                  >
                    <GoClock />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      Change Password
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Update your password to keep your account secure
                    </p>
                  </div>
                </div>
                <Button
                  className={'bg-transparent text-black hover:text-white'}
                >
                  Change
                </Button>
              </div>
              {/* 2 */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      'rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400'
                    }
                  >
                    <IoKeyOutline />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      Add Transaction PIN
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Set up a 4-digit PIN for secure transactions
                    </p>
                  </div>
                </div>
                <Button
                  className={'bg-transparent text-black hover:text-white'}
                >
                  Set PIN
                </Button>
              </div>

              {/* 3 */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      'rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400'
                    }
                  >
                    <IoShieldOutline />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      2-Factor Authentication
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* preference */}
        <div className="basis-full p-8 md:basis-[49%]">
          <div className="mb-6 space-y-0.5">
            <h4 className="title">Preferences</h4>
            <p className="text-lg-regular text-lg text-gray-800">
              Customize your app experience and notifications
            </p>
            <div className="mt-4 flex flex-col gap-8 p-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      'rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400'
                    }
                  >
                    <GoClock />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      Push Notifications
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Receive notifications about orders
                    </p>
                  </div>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              {/* 2 */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={
                      'rounded-full bg-green-100/90 p-2 text-green-400/90 group-hover:bg-green-200 group-hover:text-green-400'
                    }
                  >
                    <IoKeyOutline />
                  </span>
                  <div>
                    <h5 className="text-md-medium text-xl text-black!">
                      Language
                    </h5>
                    <p className="mt-2 text-gray-800">
                      Choose your preferred language
                    </p>
                  </div>
                </div>
                <Button
                  className={'bg-transparent text-black hover:text-white'}
                >
                  English
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* delete my account */}

      <div className="border-error/40 mt-12 hidden rounded-xl border-[0.1px] p-8 lg:block">
        <div className="mb-6 space-y-0.5">
          <h4 className="title">Delete My Account</h4>
          <p className="text-lg-regular text-lg text-gray-800">
            Permanent actions that cannot be undone
          </p>
          <div className="mt-4 flex flex-col gap-8 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <span
                  className={
                    'rounded-full bg-red-100/90 p-2 text-red-400/90 group-hover:bg-red-200 group-hover:text-red-400'
                  }
                >
                  <RiDeleteBin5Line />
                </span>
                <div>
                  <h5 className="text-md-medium text-xl text-black!">
                    Delete Account
                  </h5>
                </div>
              </div>
              <Button className={'bg-error hover:bg-error text-white'}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
