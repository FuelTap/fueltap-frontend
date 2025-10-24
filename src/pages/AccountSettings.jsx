import { formSchema } from '@/features/register/formsSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { splitName } from '@/utils/helpers';
import { useSelector } from 'react-redux';
import { GoClock } from 'react-icons/go';
import { IoKeyOutline, IoShieldOutline } from 'react-icons/io5';
import { RiDeleteBin5Line } from 'react-icons/ri';

const AccountSettings = () => {
  const { user } = useSelector((store) => store.user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.full_name,
      phone: user.phone_number,
    },
  });

  function onSubmit() {}

  const name = user.full_name;
  return (
    <div>
      <h1 className="text-4xl font-semibold text-blue-600">Account Settings</h1>
      <p className="text-grey-800 text-xl font-[400]">
        Manage your account information, security settings, and preferences
      </p>

      <article className="bg-secondary-50 mt-8 p-8">
        <div className="mb-6 space-y-0.5">
          <h4 className="title">Profile Information</h4>
          <p className="text-lg-regular text-gray-800">
            Update your personal details and profile photo
          </p>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap-1">
            <Avatar className="size-23 text-2xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{splitName(name)}</AvatarFallback>
            </Avatar>
            <small className="text-primary-400 text-sm font-medium">
              Change photo
            </small>
          </div>
          {/* form part */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-9"
            >
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className={'basis-[49%]'}>
                      <FormLabel className={'text-lg-medium'}>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ochife Ogechukwu" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className={'basis-[49%]'}>
                      <FormLabel className={'text-lg-medium'}>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="90 22473 2723"
                          inputMode="numeric"
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ''
                            );
                          }}
                          className={
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:border-l-0 focus-visible:ring-[1px]'
                          }
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  variant={'secondary'}
                  className="text-md-medium"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  className="text-md-medium bg-transparent text-black hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </article>

      <div className="flex justify-between">
        <div className="basis-[49%] p-8">
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
        <div className="basis-[49%] p-8">
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

      <div className="border-error/40 mt-12 rounded-xl border-[0.1px] p-8">
        <div className="mb-6 space-y-0.5">
          <h4 className="title">Delete My Account</h4>
          <p className="text-lg-regular text-lg text-gray-800">
            Permanent actions that cannot be undone
          </p>
          <div className="mt-4 flex flex-col gap-8 p-4">
            <div className="flex items-center justify-between gap-6">
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
